import React, { useRef } from 'react';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';
import { useRestoreScrollPostion } from '../../utils/useRestoreScrollPostion';
import { ComicData } from '../../../typing';

export function Comic({
  adultOnly,
  chapters,
  comicID,
  ...comicHeaderProps
}: ComicData) {
  const contentElRef = useRef<HTMLDivElement>(null);

  // FIXME: save chapter type
  useRestoreScrollPostion(contentElRef, comicID);

  return (
    <Layout className="comic" ref={contentElRef}>
      <ComicHeader {...comicHeaderProps} />
      <ComicChapters
        comicID={comicID}
        chapters={chapters}
        adultOnly={adultOnly}
      />
    </Layout>
  );
}
