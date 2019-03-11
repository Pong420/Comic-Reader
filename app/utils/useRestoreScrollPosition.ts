import { useLayoutEffect, RefObject } from 'react';

const scrollPositionMap = new Map<string, number>();

export function useRestoreScrollPosition(
  ref: RefObject<HTMLElement>,
  key: string
) {
  useLayoutEffect(() => {
    const scrollTop = scrollPositionMap.get(key);

    if (scrollTop) {
      ref.current!.scrollTop = scrollTop;
    }

    return () => {
      scrollPositionMap.set(key, ref.current!.scrollTop);
    };
  }, []);
}
