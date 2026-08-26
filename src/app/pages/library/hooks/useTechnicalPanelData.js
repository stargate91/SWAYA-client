import { useMemo } from 'react';
import {
  EDITION_LABELS,
  SOURCE_LABELS,
  AUDIO_TYPE_LABELS,
  formatBytes,
  formatTime,
  formatAudioCodec,
  formatBitDepth,
  formatFramerate,
} from '@/lib/formatters';

/**
 * Custom hook to extract, format, and aggregate technical and edition/source
 * specifications for media detail display.
 *
 * @param {object} params
 * @param {object} [params.item] - Media item data (with .technical)
 * @param {boolean} [params.isMovie] - Whether current media item is a movie
 * @param {string} [params.variant] - Display variant ('drawer' | 'default')
 * @param {Function} [params.t] - Translation function
 */
export function useTechnicalPanelData({
  item = {},
  isMovie = false,
  variant,
  t = (k) => k,
} = {}) {
  const technical = item?.technical;

  const audioCodecText = useMemo(
    () => formatAudioCodec(technical?.audio_codec, technical?.audio_channels),
    [technical]
  );

  const bitDepthText = useMemo(
    () => formatBitDepth(technical?.bit_depth),
    [technical]
  );

  const framerateText = useMemo(
    () => formatFramerate(technical?.framerate),
    [technical]
  );

  const hasEditionSource = useMemo(() => {
    return Boolean(
      isMovie &&
      ((technical?.edition && technical.edition !== 'none') ||
       (technical?.source && technical.source !== 'none') ||
       (technical?.audio_type && technical.audio_type !== 'none'))
    );
  }, [isMovie, technical]);

  const hasSpecs = Boolean(technical);
  const gridVariant = variant === 'drawer' ? 'split' : 'auto-fit';

  const editionSourceSpecs = useMemo(() => {
    if (!hasEditionSource) return [];
    const specs = [];
    if (technical?.edition && technical.edition !== 'none') {
      specs.push({
        key: 'edition',
        label: t('library.details.edition') || 'Edition',
        value: EDITION_LABELS[technical.edition] || technical.edition,
        iconType: 'sparkles',
      });
    }
    if (technical?.source && technical.source !== 'none') {
      specs.push({
        key: 'source',
        label: t('library.details.source') || 'Source',
        value: SOURCE_LABELS[technical.source] || technical.source,
        iconType: 'film',
      });
    }
    if (technical?.audio_type && technical.audio_type !== 'none') {
      specs.push({
        key: 'audio_style',
        label: t('library.details.audioStyle') || 'Audio Style',
        value: AUDIO_TYPE_LABELS[technical.audio_type] || technical.audio_type,
        iconType: 'volume2',
      });
    }
    return specs;
  }, [hasEditionSource, technical, t]);

  const technicalSpecs = useMemo(() => {
    if (!hasSpecs) return [];
    const specs = [];

    if (technical?.resolution) {
      specs.push({
        key: 'resolution',
        label: t('library.details.resolution') || 'Resolution',
        value: technical.resolution,
        iconType: 'clapperboard',
      });
    }
    if (technical?.video_codec) {
      specs.push({
        key: 'video_codec',
        label: t('library.details.videoCodec') || 'Video Codec',
        value: technical.video_codec.toUpperCase(),
        iconType: 'film',
      });
    }
    if (audioCodecText) {
      specs.push({
        key: 'audio_codec',
        label: t('library.details.audioCodec') || 'Audio Codec',
        value: audioCodecText,
        iconType: 'volume2',
      });
    }
    if (technical?.duration) {
      specs.push({
        key: 'duration',
        label: t('library.details.duration') || 'Duration',
        value: formatTime(technical.duration),
        iconType: 'clock',
      });
    }
    if (technical?.size_bytes) {
      specs.push({
        key: 'file_size',
        label: t('library.details.fileSize') || 'File Size',
        value: formatBytes(technical.size_bytes),
        iconType: 'database',
      });
    }
    if (technical?.hdr_type) {
      specs.push({
        key: 'hdr',
        label: t('library.details.hdr') || 'HDR',
        value: technical.hdr_type,
        iconType: 'sparkles',
      });
    }
    if (bitDepthText) {
      specs.push({
        key: 'bit_depth',
        label: t('library.details.bitDepth') || 'Bit Depth',
        value: bitDepthText,
        iconType: 'layers',
      });
    }
    if (framerateText) {
      specs.push({
        key: 'framerate',
        label: t('library.details.framerate') || 'Framerate',
        value: framerateText,
        iconType: 'fastForward',
      });
    }

    return specs;
  }, [hasSpecs, technical, audioCodecText, bitDepthText, framerateText, t]);

  return {
    hasEditionSource,
    hasSpecs,
    gridVariant,
    editionSourceSpecs,
    technicalSpecs,
    audioCodecText,
    bitDepthText,
    framerateText,
  };
}
