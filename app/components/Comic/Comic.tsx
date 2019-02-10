import React from 'react';
import { Layout } from '../Layout';
import { ComicData } from '../../../typing';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';

export interface ComicProps {
  comicData: ComicData;
}

export function Comic({ chapters, comicID, ...comicHeader }: ComicData) {
  return (
    <Layout className="comic">
      <ComicHeader {...comicHeader} />
      <ComicChapters comicID={comicID} chapters={chapters} />
    </Layout>
  );
}
