import React, { useContext, useLayoutEffect } from 'react';
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
  };

export const ComicContentContext = React.createContext({} as Context);

export const ComicContentProvider: React.FC = ({ children }) => {
  const match = useRouteMatch<MatchParams>(PATHS.COMIC_CONTENT);
  const pageNo = Number(match && match.params.pageNo) || 1;

  const { imagesDetail, preloadImage, clearPreloadImage } = usePreloadImages({
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
    total,
    beforeChapterChanged: clearPreloadImage
  });

  return (
    <ComicContentContext.Provider
      value={{
        total,
        pageNo,
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
