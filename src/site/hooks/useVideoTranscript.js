import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook managing disclosure state and presentation data for the VideoTranscript component.
 * @param {object} [transcript] - Video transcript data object
 * @returns {object} Transcript state and event handlers
 */
export function useVideoTranscript(transcript) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback((e) => {
    setIsOpen(e.currentTarget.open);
  }, []);

  const data = useMemo(() => {
    if (!transcript) return null;

    return {
      title: transcript.title || '',
      description: transcript.description || null,
      items: Array.isArray(transcript.items) ? transcript.items : [],
      hasContent: Boolean(
        transcript.title &&
          (transcript.description || (transcript.items && transcript.items.length > 0))
      ),
    };
  }, [transcript]);

  return {
    data,
    isOpen,
    handleToggle,
  };
}

export default useVideoTranscript;
