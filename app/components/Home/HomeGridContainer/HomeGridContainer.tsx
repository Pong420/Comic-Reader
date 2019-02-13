import React, { ReactNode } from 'react';

export interface HomeGridContainerProps {
  list: any[];
  render: (props: any, index: number) => ReactNode;
  onLoadMore?: () => void;
}

export function HomeGridContainer({ list, render }: HomeGridContainerProps) {
  return <div className="home-grid-container">{list.map(render)}</div>;
}
