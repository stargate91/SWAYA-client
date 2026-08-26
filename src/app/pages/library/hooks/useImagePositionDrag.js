import { useState, useEffect, useCallback } from 'react';

export function useImagePositionDrag({ customImages, setCustomImages }) {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartPercentX, setDragStartPercentX] = useState(50);
  const [dragStartPercentY, setDragStartPercentY] = useState(50);

  const handleDragStart = useCallback((index, e) => {
    e.preventDefault();
    setDraggingIndex(index);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStartX(clientX);
    setDragStartY(clientY);
    const currentImg = customImages[index];
    setDragStartPercentX(currentImg?.position_x ?? 50);
    setDragStartPercentY(currentImg?.position_y ?? 50);
  }, [customImages]);

  const handleDragMove = useCallback((e) => {
    if (draggingIndex === null) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStartX;
    const deltaY = clientY - dragStartY;
    const containerSize = 80;
    const deltaPercentX = (deltaX / containerSize) * 100;
    const deltaPercentY = (deltaY / containerSize) * 100;
    const newPercentX = Math.max(0, Math.min(100, Math.round(dragStartPercentX - deltaPercentX)));
    const newPercentY = Math.max(0, Math.min(100, Math.round(dragStartPercentY - deltaPercentY)));

    setCustomImages((prev) =>
      prev.map((img, idx) => (idx === draggingIndex ? { ...img, position_x: newPercentX, position_y: newPercentY } : img))
    );
  }, [draggingIndex, dragStartX, dragStartY, dragStartPercentX, dragStartPercentY, setCustomImages]);

  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  useEffect(() => {
    if (draggingIndex !== null) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [draggingIndex, handleDragMove, handleDragEnd]);

  return {
    draggingIndex,
    handleDragStart,
  };
}
