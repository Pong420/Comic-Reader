import { useEffect } from 'react';

export function useKeydown(handler: (evt: KeyboardEvent) => void) {
  useEffect(() => {
    addEventListener('keydown', handler);

    return () => {
      removeEventListener('keydown', handler);
    };
  }, []);
}
