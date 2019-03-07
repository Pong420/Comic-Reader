import { Dispatch } from 'redux';
import { ComicItemList } from '../../typing';

export enum LatestUpdateKeys {
  SET_COMICS = 'SET_COMICS',
  ADD_COMICS = 'ADD_COMICS',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
  SET_FILTER = 'SET_FILTER',
  SET_NO_MORE_COMIC_RESULT = 'SET_NO_MORE_COMIC_RESULT'
}

interface SetComicAction {
  type: LatestUpdateKeys.SET_COMICS;
  payload: {
    comicList: ComicItemList;
  };
}

interface AddComicAction {
  type: LatestUpdateKeys.ADD_COMICS;
  payload: AddComicsPayload;
}

interface SetPageNoAction {
  type: LatestUpdateKeys.SET_PAGE_NUMBER;
  payload: {
    page: number;
  };
}

interface SetFilterAction {
  type: LatestUpdateKeys.SET_FILTER;
  payload: string[];
}

interface SetNoMoreComicResultAction {
  type: LatestUpdateKeys.SET_NO_MORE_COMIC_RESULT;
  payload: boolean;
}

export type LatestUpdateTypes =
  | SetComicAction
  | AddComicAction
  | SetPageNoAction
  | SetFilterAction
  | SetNoMoreComicResultAction;

export interface AddComicsPayload {
  comicList: ComicItemList;
  page: number;
  from?: number;
  to?: number;
}

export type LatestUpdateActions = {
  setComics: typeof setComics;
  addComics: typeof addComics;
  setPageNumber: typeof setPageNumber;
  setFilter: typeof setFilter;
  setNoMoreComicResult: typeof setNoMoreComicResult;
};

export function setComics(comicList: ComicItemList): SetComicAction {
  return {
    type: LatestUpdateKeys.SET_COMICS,
    payload: {
      comicList
    }
  };
}

export function addComics({ page, comicList, from, to }: AddComicsPayload) {
  return (dispatch: Dispatch) => {
    dispatch(setPageNumber(page));
    dispatch({
      type: LatestUpdateKeys.ADD_COMICS,
      payload: {
        comicList,
        from,
        to
      }
    });
  };
}

export function setPageNumber(page: number): SetPageNoAction {
  return {
    type: LatestUpdateKeys.SET_PAGE_NUMBER,
    payload: {
      page
    }
  };
}

export function setFilter(payload: string[]): SetFilterAction {
  return {
    type: LatestUpdateKeys.SET_FILTER,
    payload
  };
}

export function setNoMoreComicResult(
  payload: boolean
): SetNoMoreComicResultAction {
  return {
    type: LatestUpdateKeys.SET_NO_MORE_COMIC_RESULT,
    payload
  };
}

export default {
  setComics,
  addComics,
  setPageNumber,
  setFilter,
  setNoMoreComicResult
};
