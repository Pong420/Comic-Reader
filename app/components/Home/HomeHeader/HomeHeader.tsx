import React from 'react';

export interface HomeHeaderPorps {}

export function HomeHeader({  }: HomeHeaderPorps) {
  return (
    <div className="home-header">
      <div className="home-header-tab active">最新更新</div>
      <div className="home-header-tab">收藏</div>
    </div>
  );
}
