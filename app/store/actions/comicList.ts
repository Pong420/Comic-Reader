import { Action } from 'redux';
import { AxiosError } from 'axios';
import { ComicItemList, GetComicListParam } from '../../../typing';

export enum ComicListTypes {
  GET_COMICS_LIST = 'GET_COMICS_LIST',
  GET_COMICS_LIST_SUCCESS = 'GET_COMICS_LIST_SUCCESS',
  GET_COMICS_LIST_FAILED = 'GET_COMICS_LIST_FAILED',
  GET_COMICS_LIST_CANCELED = 'GET_COMICS_LIST_CANCELED',
  SET_COMICS_LIST = 'SET_COMICS_LIST',
  ADD_COMICS_LIST = 'ADD_COMICS_LIST',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
  SET_FILTER = 'SET_FILTER',
  SET_NO_MORE_COMIC_RESULT = 'SET_NO_MORE_COMIC_RESULT'
}

export interface GetComicList extends Action {
  type: ComicListTypes.GET_COMICS_LIST;
  payload: GetComicListParam;
}

interface GetComicListSuccess extends Action {
  type: ComicListTypes.GET_COMICS_LIST_SUCCESS;
}

interface GetComicListFailed extends Action {
  type: ComicListTypes.GET_COMICS_LIST_FAILED;
  payload: AxiosError;
}

interface GetComicListCanceled extends Action {
  type: ComicListTypes.GET_COMICS_LIST_CANCELED;
}

interface SetComicAction extends Action {
  type: ComicListTypes.SET_COMICS_LIST;
  payload: ComicItemList;
}

interface AddComicAction extends Action {
  type: ComicListTypes.ADD_COMICS_LIST;
  payload: AddComicsPayload;
}

interface SetPageNoAction extends Action {
  type: ComicListTypes.SET_PAGE_NUMBER;
  payload: {
    page: number;
  };
}

interface SetFilterAction extends Action {
  type: ComicListTypes.SET_FILTER;
  payload: string[];
}

interface SetNoMoreComicResultAction extends Action {
  type: ComicListTypes.SET_NO_MORE_COMIC_RESULT;
  payload: boolean;
}

export type ComicListActions =
  | GetComicList
  | GetComicListSuccess
  | GetComicListFailed
  | GetComicListCanceled
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

export function getComicList(payload: GetComicListParam): GetComicList {
  return {
    type: ComicListTypes.GET_COMICS_LIST,
    payload
  };
}

export function setComics(payload: ComicItemList): SetComicAction {
  return {
    type: ComicListTypes.SET_COMICS_LIST,
    payload
  };
}

export function addComics({
  page,
  comicList,
  from,
  to
}: AddComicsPayload): AddComicAction {
  return {
    type: ComicListTypes.ADD_COMICS_LIST,
    payload: {
      page,
      comicList,
      from,
      to
    }
  };
}

export function setPageNumber(page: number): SetPageNoAction {
  return {
    type: ComicListTypes.SET_PAGE_NUMBER,
    payload: {
      page
    }
  };
}

export function setFilter(payload: string[]): SetFilterAction {
  return {
    type: ComicListTypes.SET_FILTER,
    payload
  };
}

export function setNoMoreComicResult(
  payload: boolean
): SetNoMoreComicResultAction {
  return {
    type: ComicListTypes.SET_NO_MORE_COMIC_RESULT,
    payload
  };
}

export const ComicListActionCreators = {
  getComicList,
  setComics
};
