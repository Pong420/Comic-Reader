import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ComicImage } from './ComicImage';
import { useComicContent } from '../../hooks/useComicContent';
import { useBrowsingHistory } from '../../hooks/useBrowsingHistory';

interface MatchParams {
  comicID: string;
  chapterID: string;
  pageNo?: string;
}

export function ComicContent({ match }: RouteComponentProps<MatchParams>) {
  const { comicID, chapterID, pageNo } = match.params;
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    imagesDetail,
    run,
    nextPage,
    prevPage,
    fitToPage
  } = useComicContent();

  useBrowsingHistory({ comicID, chapterID });

  useEffect(() => run({ comicID, chapterID }), [comicID, chapterID, run]);

  useEffect(() => {
    const el = contentRef.current;
    el && el.scrollTo(0, 0);
  }, [pageNo]);

  return (
    <div
      className={`comic-content ${fitToPage ? 'fit-to-page' : ''}`.trim()}
      onClick={nextPage}
      onContextMenu={prevPage}
      ref={contentRef}
    >
      {imagesDetail.map(props => (
        <ComicImage
          {...props}
          key={props.src}
          hidden={Number(pageNo) !== props.index + 1}
        />
      ))}
    </div>
  );
}
