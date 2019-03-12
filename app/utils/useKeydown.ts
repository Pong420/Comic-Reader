import { useLayoutEffect } from 'react';

export function useKeydown(
  handler: (evt: KeyboardEvent) => void,
  deps: ReadonlyArray<any> = []
) {
  useLayoutEffect(() => {
    addEventListener('keydown', handler);

    return () => {
      removeEventListener('keydown', handler);
    };
  }, deps);
}
