import React, { useContext, useLayoutEffect, useCallback } from 'react';
import { generatePath } from 'react-router-dom';
import {
  Schema$ComicContent,
  Params$ComicContent,
  Schema$ImageDetail
} from '../typings';
import { getComicContent } from '../service';
import { useRouteMatch } from 'react-router';
import { useRxAsync, RxAsyncState } from 'use-rx-hooks';
import { usePreloadImages } from './usePreloadImages';
import { usePrevNextChapter } from './usePrevNextChapter';
import { PATHS } from '../constants';
import { history } from '../store';

export interface MatchParams {
  comicID: string;
  chapterID: string;
  pageNo?: string;
}

type Context = RxAsyncState<Schema$ComicContent, Params$ComicContent> &
  ReturnType<typeof usePrevNextChapter> & {
    total: number;
    pageNo: number;
    imagesDetail: Schema$ImageDetail[];
    handlePageChange: (pageNo: number) => void;
  };

export const ComicContentContext = React.createContext({} as Context);

export const ComicContentProvider: React.FC = ({ children }) => {
  const match = useRouteMatch<MatchParams>(PATHS.COMIC_CONTENT);
  const pageNo = Number(match && match.params.pageNo) || 1;

  const { imagesDetail, preloadImage } = usePreloadImages({
    comicID: match ? match.params.comicID : '',
    pageNo
  });

  const state = useRxAsync(getComicContent, {
    effect: useLayoutEffect,
    onSuccess: preloadImage,
    defer: true
  });

  const total = imagesDetail.length;

  const navigation = usePrevNextChapter({
    ...state.data,
    ...(match && match.params),
    pageNo,
    total
  });

  const handlePageChange = useCallback(
    pageNo =>
      history.push(
        generatePath(PATHS.COMIC_CONTENT, {
          ...(match && match.params),
          pageNo
        })
      ),
    [match]
  );

  return (
    <ComicContentContext.Provider
      value={{
        total,
        pageNo,
        handlePageChange,
        imagesDetail,
        ...state,
        ...navigation
      }}
    >
      {children}
    </ComicContentContext.Provider>
  );
};

export const useComicContent = () => useContext(ComicContentContext);
