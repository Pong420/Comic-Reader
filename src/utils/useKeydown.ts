import { useEffect } from 'react';

export function useKeydown(callback: (evt: KeyboardEvent) => void) {
  useEffect(() => {
    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, [callback]);
}
