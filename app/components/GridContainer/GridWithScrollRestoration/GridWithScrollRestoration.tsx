import React, {
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
  Ref,
  RefObject
} from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Grid, GridProps, OnScrollParams } from 'react-virtualized';

export type GridWithScrollRestorationProps = GridProps &
  RouteComponentProps & {
    forwardedRef?: RefObject<Grid>;
  };

const scrollPosition = new Map<string, number>();

const BaseComponent = withRouter(
  ({ location, forwardedRef, ...props }: GridWithScrollRestorationProps) => {
    const [mounted, setMounted] = useState(false);
    const gridRef = forwardedRef || useRef<Grid>(null);
    const key = location.pathname;
    const scrollRef = useRef<number>(scrollPosition.get(key) || 0);

    function onScroll({ scrollTop }: OnScrollParams) {
      if (mounted) {
        scrollRef.current = scrollTop;
      }
    }

    useLayoutEffect(() => {
      gridRef.current!.scrollToPosition({
        scrollTop: scrollRef.current,
        scrollLeft: 0
      });

      setMounted(true);

      return () => {
        scrollPosition.set(key, scrollRef.current);
      };
    }, []);

    return <Grid {...props} ref={gridRef} onScroll={onScroll} />;
  }
);

export const GridWithScrollRestoration = forwardRef(
  (props: GridWithScrollRestorationProps, ref: Ref<Grid>) => (
    <BaseComponent {...props} forwardedRef={ref} />
  )
);
