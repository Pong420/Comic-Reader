import { useEffect } from 'react';

export function useKeydown(
  handler: (evt: KeyboardEvent) => void,
  deps: ReadonlyArray<any> = []
) {
  useEffect(() => {
    addEventListener('keydown', handler);

    return () => {
      removeEventListener('keydown', handler);
    };
  }, [handler, ...deps]);
}
