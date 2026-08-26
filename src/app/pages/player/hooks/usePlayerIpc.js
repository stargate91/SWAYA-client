import { useEffect, useRef, useCallback } from 'react';
import { sendIpc, onIpc, isElectron } from '@/lib/ipc';
import { setSavedPlayerVolume, setSavedPlayerMute } from '@/lib/playerAudio';
import { useSettingsQuery } from '@/queries/settingsQueries';

const ISO_LANG_MAP = {
  hu: ['hun', 'hu', 'hungarian', 'magyar'],
  en: ['eng', 'en', 'english', 'en-us', 'en-gb'],
  de: ['deu', 'ger', 'de', 'german', 'deutsch'],
  fr: ['fra', 'fre', 'fr', 'french', 'francais', 'français'],
  es: ['spa', 'es', 'spanish', 'espanol', 'español'],
  it: ['ita', 'it', 'italian', 'italiano'],
  ru: ['rus', 'ru', 'russian', 'русский'],
  ja: ['jpn', 'ja', 'japanese', '日本語'],
  zh: ['zho', 'chi', 'zh', 'chinese', '中文'],
  'zh-tw': ['zht', 'zh-tw', 'zh-hk', 'traditional chinese', '繁體中文', '繁體'],
  pt: ['por', 'pt', 'portuguese', 'português'],
  pl: ['pol', 'pl', 'polish', 'polski'],
  nl: ['nld', 'dut', 'nl', 'dutch', 'nederlands'],
  sv: ['swe', 'sv', 'swedish', 'svenska'],
  no: ['nor', 'no', 'norwegian', 'norsk'],
  fi: ['fin', 'fi', 'finnish', 'suomi'],
  da: ['dan', 'da', 'danish', 'dansk'],
  ko: ['kor', 'ko', 'korean', '한국어'],
  tr: ['tur', 'tr', 'turkish', 'türkçe', 'turkce'],
  cs: ['ces', 'cze', 'cs', 'czech', 'čeština', 'cestina'],
};

const matchLanguages = (trackText, targetLangCodeOrName) => {
  if (!trackText || !targetLangCodeOrName || targetLangCodeOrName === 'none') return false;
  const text = trackText.toLowerCase().trim();
  const target = targetLangCodeOrName.toLowerCase().trim();
  if (text === target) return true;

  const targetGroup = ISO_LANG_MAP[target]
    || Object.values(ISO_LANG_MAP).find((group) => group.includes(target))
    || [target];

  for (const alias of targetGroup) {
    if (text === alias) return true;
    const regex = new RegExp(`(^|[^a-z0-9])${alias}([^a-z0-9]|$)`, 'i');
    if (regex.test(text)) return true;
  }

  return false;
};

export default function usePlayerIpc({
  itemId,
  isTrailer,
  containerRef,
  currentTimeRef,
  videoParamsRef,
  durationRef,
  volumeRef,
  isMutedRef,
  chaptersRef,
  hasTriggeredEndRef,
  hasDismissedEndRef,
  setCurrentTime,
  setShowEndOverlay,
  setDuration,
  setIsPaused,
  setVolume,
  setIsMuted,
  setChapters,
  setTrackList,
  setSubDelay,
  setAudioDelay,
  setSpeed,
  setVideoParams,
  setIsPip,
  handleCloseRef,
  updateBottomOffset,
  sendCommand,
}) {
  const { data: settings } = useSettingsQuery();
  const settingsRef = useRef(settings);
  useEffect(() => { settingsRef.current = settings; }, [settings]);
  const trackListRef = useRef([]);
  const autoSelectDoneRef = useRef({ audioDone: false, subDone: false });
  const lastTimePosUiUpdateRef = useRef(0);

  const applyAutoTrackSelection = useCallback((tracks, currentSettings) => {
    if (!tracks || !currentSettings || !Array.isArray(tracks)) return;

    const audioTracks = tracks.filter((t) => t.type === 'audio');
    const subTracks = tracks.filter((t) => t.type === 'sub');

    const prefAudio = currentSettings.player_preferred_audio_language || 'none';
    const prefSub = currentSettings.player_preferred_subtitle_language || 'none';
    const subMode = currentSettings.player_subtitle_mode || 'off_with_matching_audio';

    // 1. Audio Auto Selection
    if (!autoSelectDoneRef.current.audioDone && audioTracks.length > 0) {
      let selectedAudio = null;
      if (prefAudio !== 'none') {
        const fallbacks = [prefAudio, ...(prefAudio !== 'en' ? ['en'] : [])];
        for (const lang of fallbacks) {
          selectedAudio = audioTracks.find((t) => matchLanguages(t.lang, lang) || matchLanguages(t.title, lang));
          if (selectedAudio) break;
        }
      }
      if (selectedAudio) {
        const currentSelectedAudio = audioTracks.find((t) => t.selected);
        if (!currentSelectedAudio || String(currentSelectedAudio.id) !== String(selectedAudio.id)) {
          sendCommand(['set_property', 'aid', selectedAudio.id]);
        }
      }
      autoSelectDoneRef.current.audioDone = true;
    }

    // 2. Subtitle Auto Selection
    if (!autoSelectDoneRef.current.subDone && subTracks.length > 0) {
      let selectedSubId = 'no';
      const activeAudio = audioTracks.find((t) => t.selected) || audioTracks[0];
      const audioLang = activeAudio?.lang || activeAudio?.title || '';

      if (subMode === 'always') {
        if (prefSub !== 'none') {
          const subMatch = subTracks.find((t) => matchLanguages(t.lang, prefSub) || matchLanguages(t.title, prefSub));
          if (subMatch) {
            selectedSubId = subMatch.id;
          }
        }
      } else if (subMode === 'off_with_matching_audio') {
        if (prefSub !== 'none') {
          if (matchLanguages(audioLang, prefSub)) {
            selectedSubId = 'no';
          } else {
            const subMatch = subTracks.find((t) => matchLanguages(t.lang, prefSub) || matchLanguages(t.title, prefSub));
            if (subMatch) {
              selectedSubId = subMatch.id;
            }
          }
        }
      } else if (subMode === 'off') {
        selectedSubId = 'no';
      }

      const currentSelectedSub = subTracks.find((t) => t.selected);
      const currentSelectedSubId = currentSelectedSub ? currentSelectedSub.id : 'no';

      if (String(currentSelectedSubId) !== String(selectedSubId)) {
        sendCommand(['set_property', 'sid', selectedSubId]);
      }
      autoSelectDoneRef.current.subDone = true;
    }
  }, [sendCommand]);

  useEffect(() => {
    if (trackListRef.current && settings) {
      applyAutoTrackSelection(trackListRef.current, settings);
    }
  }, [settings, applyAutoTrackSelection]);

  useEffect(() => {
    return onIpc('theme-changed', (event, newTheme) => {
      document.documentElement.setAttribute('data-theme', newTheme);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const volumeInitializedRef = { current: false };
    const muteInitializedRef = { current: false };

    const handleMpvEvent = (event, data) => {
      if (!isMounted) return;

      if (data?.event === 'end-of-file') {
        if (isTrailer) {
          handleCloseRef.current();
        } else if (!hasDismissedEndRef?.current) {
          setShowEndOverlay(true);
        }
      }
      if (data?.event === 'property-change') {
        if (data.name === 'time-pos' && typeof data.data === 'number') {
          if (currentTimeRef) {
            currentTimeRef.current = data.data;
          }
          const now = Date.now();
          if (now - lastTimePosUiUpdateRef.current >= 150) {
            lastTimePosUiUpdateRef.current = now;
            setCurrentTime(data.data);
          }
          const dur = durationRef.current;
          
          let isLastChapterActive = false;
          if (chaptersRef.current && chaptersRef.current.length > 1) {
            const lastChapter = chaptersRef.current[chaptersRef.current.length - 1];
            if (lastChapter && typeof lastChapter.time === 'number' && lastChapter.time > 30) {
              isLastChapterActive = true;
              if (data.data >= lastChapter.time && !hasTriggeredEndRef.current && !hasDismissedEndRef?.current) {
                hasTriggeredEndRef.current = true;
                setShowEndOverlay(true);
              } else if (data.data < lastChapter.time - 5.0 && (hasTriggeredEndRef.current || hasDismissedEndRef?.current)) {
                hasTriggeredEndRef.current = false;
                if (hasDismissedEndRef) hasDismissedEndRef.current = false;
                setShowEndOverlay(false);
              }
            }
          }

          if (dur > 0) {
            if (data.data < dur - 5.0 && (!isLastChapterActive || (chaptersRef.current && chaptersRef.current.length > 1 && data.data < chaptersRef.current[chaptersRef.current.length - 1].time - 5.0))) {
              hasTriggeredEndRef.current = false;
              if (hasDismissedEndRef) hasDismissedEndRef.current = false;
            } else if (data.data >= dur - 1.0 && !hasTriggeredEndRef.current && !hasDismissedEndRef?.current) {
              hasTriggeredEndRef.current = true;
              if (isTrailer) {
                handleCloseRef.current();
              } else {
                sendCommand(['set_property', 'pause', true]);
                setShowEndOverlay(true);
              }
            }
          }
        }
        if (data.name === 'eof-reached' && data.data === true) {
          if (isTrailer) {
            handleCloseRef.current();
          } else if (!hasDismissedEndRef?.current) {
            sendCommand(['set_property', 'pause', true]);
            setShowEndOverlay(true);
          }
        }
        if (data.name === 'duration' && typeof data.data === 'number') {
          if (durationRef) {
            durationRef.current = data.data;
          }
          setDuration(data.data);
        }
        if (data.name === 'pause') {
          setIsPaused(data.data);
        }
        if (data.name === 'volume' && typeof data.data === 'number') {
          if (!volumeInitializedRef.current) {
            volumeInitializedRef.current = true;
            sendIpc('mpv-command', ['set_property', 'volume', volumeRef.current]);
          } else {
            setVolume(data.data);
            setSavedPlayerVolume(data.data);
          }
        }
        if (data.name === 'mute') {
          const isMutedBool = !!data.data;
          if (!muteInitializedRef.current) {
            muteInitializedRef.current = true;
            sendIpc('mpv-command', ['set_property', 'mute', isMutedRef.current]);
          } else {
            setIsMuted(isMutedBool);
            setSavedPlayerMute(isMutedBool);
          }
        }
        if (data.name === 'chapter-list' && Array.isArray(data.data)) {
          setChapters(data.data);
        }
        if (data.name === 'track-list' && Array.isArray(data.data)) {
          setTrackList(data.data);
          trackListRef.current = data.data;
          if (settingsRef.current) {
            applyAutoTrackSelection(data.data, settingsRef.current);
          }
        }
        if (data.name === 'sub-delay' && typeof data.data === 'number') {
          setSubDelay(data.data);
        }
        if (data.name === 'audio-delay' && typeof data.data === 'number') {
          setAudioDelay(data.data);
        }
        if (data.name === 'speed' && typeof data.data === 'number') {
          setSpeed?.(data.data);
        }
        if (data.name === 'video-params' && data.data) {
          setVideoParams(data.data);
        }
      }
    };

    const handlePipChange = (event, data) => {
      if (isMounted) setIsPip(data.isPip);
    };

    let unsubMpv = () => {};
    let unsubPip = () => {};

    if (isElectron) {
      unsubMpv = onIpc('mpv-event', handleMpvEvent);
      unsubPip = onIpc('pip-mode-change', handlePipChange);
      sendIpc('mpv-player-ready');
    }

    let resizeRafId = null;

    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId) return;

      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = null;

        if (isElectron && containerRef.current) {
          const bounds = containerRef.current.getBoundingClientRect();
          sendIpc('mpv-resize', {
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height
          });
        }
        updateBottomOffset(videoParamsRef.current);
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      isMounted = false;
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      unsubMpv();
      unsubPip();
      resizeObserver.disconnect();
    };
  }, [itemId, isTrailer, sendCommand, updateBottomOffset, containerRef, currentTimeRef, durationRef, volumeRef, isMutedRef, chaptersRef, videoParamsRef, hasTriggeredEndRef, hasDismissedEndRef, handleCloseRef, setCurrentTime, setShowEndOverlay, setDuration, setIsPaused, setVolume, setIsMuted, setChapters, setTrackList, setSubDelay, setAudioDelay, setSpeed, setVideoParams, setIsPip, applyAutoTrackSelection]);
}
