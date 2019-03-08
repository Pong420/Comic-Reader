import { Dispatch } from 'redux';
import { ComicItemList } from '../../typing';

export enum ComicListKeys {
  SET_COMICS = 'SET_COMICS',
  ADD_COMICS = 'ADD_COMICS',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
  SET_FILTER = 'SET_FILTER',
  SET_NO_MORE_COMIC_RESULT = 'SET_NO_MORE_COMIC_RESULT'
}

interface SetComicAction {
  type: ComicListKeys.SET_COMICS;
  payload: {
    comicList: ComicItemList;
  };
}

interface AddComicAction {
  type: ComicListKeys.ADD_COMICS;
  payload: AddComicsPayload;
}

interface SetPageNoAction {
  type: ComicListKeys.SET_PAGE_NUMBER;
  payload: {
    page: number;
  };
}

interface SetFilterAction {
  type: ComicListKeys.SET_FILTER;
  payload: string[];
}

interface SetNoMoreComicResultAction {
  type: ComicListKeys.SET_NO_MORE_COMIC_RESULT;
  payload: boolean;
}

export type ComicListActionTypes =
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

export type ComicListActions = {
  setComics: typeof setComics;
  addComics: typeof addComics;
  setPageNumber: typeof setPageNumber;
  setFilter: typeof setFilter;
  setNoMoreComicResult: typeof setNoMoreComicResult;
};

export function setComics(comicList: ComicItemList): SetComicAction {
  return {
    type: ComicListKeys.SET_COMICS,
    payload: {
      comicList
    }
  };
}

export function addComics({ page, comicList, from, to }: AddComicsPayload) {
  return (dispatch: Dispatch) => {
    dispatch(setPageNumber(page));
    dispatch({
      type: ComicListKeys.ADD_COMICS,
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
    type: ComicListKeys.SET_PAGE_NUMBER,
    payload: {
      page
    }
  };
}

export function setFilter(payload: string[]): SetFilterAction {
  return {
    type: ComicListKeys.SET_FILTER,
    payload
  };
}

export function setNoMoreComicResult(
  payload: boolean
): SetNoMoreComicResultAction {
  return {
    type: ComicListKeys.SET_NO_MORE_COMIC_RESULT,
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
