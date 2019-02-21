import React from 'react';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';
import { ComicData } from '../../../typing';

export function Comic({
  adultOnly,
  chapters,
  comicID,
  ...comicHeaderProps
}: ComicData) {
  return (
    <Layout className="comic">
      <ComicHeader {...comicHeaderProps} />
      <ComicChapters
        comicID={comicID}
        chapters={chapters}
        adultOnly={adultOnly}
      />
    </Layout>
  );
}
