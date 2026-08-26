import { useState, useCallback } from 'react';

/**
 * Custom hook to track hover state and expose event bindings.
 *
 * @param {boolean} [initialState=false]
 * @returns {Object} { isHovered, setIsHovered, handleMouseEnter, handleMouseLeave, hoverProps }
 */
export function useHover(initialState = false) {
  const [isHovered, setIsHovered] = useState(initialState);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return {
    isHovered,
    setIsHovered,
    handleMouseEnter,
    handleMouseLeave,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}

export default useHover;
