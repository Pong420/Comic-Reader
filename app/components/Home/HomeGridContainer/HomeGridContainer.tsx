import React, { ReactNode, useRef, useLayoutEffect } from 'react';
import throttle from 'lodash/throttle';

export interface HomeGridContainerProps {
  list: any[];
  render: (props: any, index: number) => ReactNode;
  onLoadMore?: () => Promise<any>;
  hidden?: boolean;
}

export function HomeGridContainer({
  list,
  render,
  hidden = true
}: HomeGridContainerProps) {
  const scrollerRef = useRef(null);
  const scrollHandler = throttle(() => {
    console.log('scrolling');
  }, 200);

  useLayoutEffect(() => {
    scrollerRef.current.addEventListener('scroll', scrollHandler);

    return () =>
      scrollerRef.current.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className="home-grid-container" hidden={hidden} ref={scrollerRef}>
      {list.map(render)}
    </div>
  );
}
