import React, { useEffect, useMemo, SyntheticEvent, useRef } from 'react';
import {
  RouteComponentProps,
  useHistory,
  generatePath
} from 'react-router-dom';
import { useRxAsync } from 'use-rx-hooks';
import { ComicImage } from './ComicImage';
import { usePreloadImages } from '../../hooks/usePreloadImages';
import { getComicContent } from '../../service';
import { PATHS } from '../../constants';

interface MatchParams {
  comicID: string;
  chapterID: string;
  pageNo?: string;
}

export function ComicContent({ match }: RouteComponentProps<MatchParams>) {
  const { comicID, chapterID } = match.params;

  const contentRef = useRef<HTMLDivElement>(null);

  const pageNo = Number(match.params.pageNo);

  const [imageDetails, preloadImage] = usePreloadImages({ pageNo });

  const { run, data } = useRxAsync(getComicContent, {
    defer: true,
    onSuccess: preloadImage
  });

  const history = useHistory();

  const total = imageDetails.length;

  const { prevId, nextId } = data || {};

  const [nextPage, prevPage] = useMemo(() => {
    const handler = (step: number) => (evt?: SyntheticEvent<HTMLElement>) => {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;
      if (newPageNo <= 0) {
        if (prevId) {
          // setMsg(MESSAGE.GOTO_PREV_CHAPTER);
          // openDialog();
        } else {
          // setMsg(MESSAGE.FIRST_CHAPTER);
          // openSnackbar();
        }
      } else if (newPageNo > total) {
        if (nextId) {
          // setMsg(MESSAGE.GOTO_NEXT_CHAPTER);
          // openDialog();
        } else {
          // setMsg(MESSAGE.LAST_CHAPTER);
          // openSnackbar();
        }
      } else {
        history.push(
          generatePath(PATHS.COMIC_CONTENT, {
            ...match.params,
            pageNo: newPageNo
          })
        );
      }
    };
    return [handler(1), handler(-1)];
  }, [history, match.params, pageNo, prevId, nextId, total]);

  useEffect(() => {
    run({ comicID, chapterID });
  }, [run, comicID, chapterID]);

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
