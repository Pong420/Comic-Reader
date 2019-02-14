import React, { ReactNode } from 'react';

export interface HomeGridContainerProps {
  list: any[];
  render: (props: any, index: number) => ReactNode;
  onLoadMore?: () => void;
  show?: boolean;
}

export function HomeGridContainer({
  list,
  render,
  show = false
}: HomeGridContainerProps) {
  const style = show
    ? {}
    : {
        display: 'none'
      };

  return (
    <div className="home-grid-container" style={style}>
      {list.map(render)}
    </div>
  );
}
