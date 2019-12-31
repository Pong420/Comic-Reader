import { useEffect } from 'react';
import { useBoolean } from './useBoolean';

export function useDraggable() {
  const [dragging, onDragStart, onDragEnd] = useBoolean();

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mouseup', onDragEnd);
      return () => {
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('mouseleave', onDragEnd);
      };
    }
  }, [dragging, onDragEnd]);

  return { dragging, onDragStart };
}
