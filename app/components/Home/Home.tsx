import React from 'react';
import { Layout } from '../Layout';
import { HomeHeader } from './HomeHeader';
import { HomeGridContainer } from './HomeGridContainer';
import { ComicItem } from './ComicItem';
import { ComicItemList } from '../../../typing';

export interface HomeProps {
  comicList: ComicItemList;
}

export function Home({ comicList }: HomeProps) {
  return (
    <Layout className="home">
      <HomeHeader />
      <HomeGridContainer
        list={comicList}
        render={(props, index) => <ComicItem {...props} key={index} />}
        onLoadMore={() => {}}
      />
    </Layout>
  );
}
