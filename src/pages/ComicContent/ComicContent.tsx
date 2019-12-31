import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRxAsync } from 'use-rx-hooks';
import { ComicImage } from './ComicImage';
import { getComicContent } from '../../service';
import { usePreloadImages } from '../../hooks/usePreloadImages';
import { usePrevNextChapter } from '../../hooks/usePrevNextChapter';
import { useBrowsingHistory } from '../../hooks/useBrowsingHistory';

interface MatchParams {
  comicID: string;
  chapterID: string;
  pageNo?: string;
}

export function ComicContent({ match }: RouteComponentProps<MatchParams>) {
  const { comicID, chapterID } = match.params;

  const contentRef = useRef<HTMLDivElement>(null);

  const pageNo = Number(match.params.pageNo);

  const { imageDetails, preloadImage, clearPreloadImage } = usePreloadImages({
    pageNo
  });

  useBrowsingHistory({ comicID, chapterID });

  const { run, data } = useRxAsync(getComicContent, {
    defer: true,
    onSuccess: preloadImage
  });

  const total = imageDetails.length;

  const { prevId, nextId } = data || {};

  const { nextPage, prevPage } = usePrevNextChapter({
    prevId,
    nextId,
    total,
    beforeChapterChanged: clearPreloadImage
  });

  useEffect(() => {
    run({ comicID, chapterID });
  }, [comicID, chapterID, run]);

  useEffect(() => {
    const el = contentRef.current;
    el && el.scrollTo(0, 0);
  }, [pageNo]);

  return (
    <div
      className="comic-content"
      onClick={nextPage}
      onContextMenu={prevPage}
      ref={contentRef}
    >
      {imageDetails.map(props => (
        <ComicImage
          {...props}
          key={props.src}
          hidden={pageNo !== props.index + 1}
        />
      ))}
    </div>
  );
}
