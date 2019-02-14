import React, { useState } from 'react';
import { Layout } from '../Layout';
import { HomeHeader } from './HomeHeader';
import { HomeGridContainer } from './HomeGridContainer';
import { ComicItem } from './ComicItem';
import { ComicItemList } from '../../../typing';

export interface HomeProps {
  comicList: ComicItemList;
}

export function Home({ comicList }: HomeProps) {
  const tabs = ['最新更新', '收藏'];
  const [currentSection, setCurrentSection] = useState(tabs[0]);

  return (
    <Layout className="home">
      <HomeHeader tabs={tabs} onChange={label => setCurrentSection(label)} />
      <HomeGridContainer
        hidden={currentSection !== tabs[0]}
        list={comicList}
        render={(props, index) => <ComicItem {...props} key={index} />}
        onLoadMore={() => Promise.resolve()}
      />
    </Layout>
  );
}
