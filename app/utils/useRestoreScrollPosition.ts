import { useLayoutEffect, RefObject } from 'react';

const scrollPositionMap = new Map<string, number>();

export function useRestoreScrollPosition(
  ref: RefObject<HTMLElement>,
  key: string,
  deps: ReadonlyArray<any> = []
) {
  useLayoutEffect(() => {
    const scrollTop = scrollPositionMap.get(key);

    if (ref.current && scrollTop) {
      ref.current.scrollTop = scrollTop;
    }
  }, [key, ref, ...deps]);

  useLayoutEffect(() => {
    return () => {
      if (ref.current) {
        scrollPositionMap.set(key, ref.current.scrollTop);
      }
    };
  }, [key, ref]);
}
