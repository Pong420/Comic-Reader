import React from 'react';
import { Layout } from '../Layout';
import { ComicItem } from './ComicItem';
import { ComicItemList } from '../../../typing';

export interface HomeProps {
  comicList: ComicItemList;
}

export function Home({ comicList }: HomeProps) {
  return (
    <Layout className="home">
      <div className="grid-container">
        {comicList.map((props, index: number) => (
          <ComicItem {...props} key={index} />
        ))}
      </div>
    </Layout>
  );
}
