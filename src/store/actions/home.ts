import { Schema$ComicItem, ApiError } from '../../typings';

export enum HomeActionTypes {
  GET_COMICS_LIST = 'GET_COMICS_LIST',
  GET_COMICS_LIST_SUCCESS = 'GET_COMICS_LIST_SUCCESS',
  GET_COMICS_LIST_FAIL = 'GET_COMICS_LIST_FAIL',
  GET_COMICS_LIST_CANCELED = 'GET_COMICS_LIST_CANCELED',
  GET_MORE_COMICS_LIST = 'GET_MORE_COMICS_LIST',
  SET_FILTER = 'SET_FILTER'
}

export interface GetComicList {
  type: HomeActionTypes.GET_COMICS_LIST;
}

export interface GetComicListSuccess {
  type: HomeActionTypes.GET_COMICS_LIST_SUCCESS;
  payload: Schema$ComicItem[];
}

export interface GetComicListFail {
  type: HomeActionTypes.GET_COMICS_LIST_FAIL;
  payload: ApiError;
}

export interface CancelGetComicList {
  type: HomeActionTypes.GET_COMICS_LIST_CANCELED;
}

export interface GetMoreComicList {
  type: HomeActionTypes.GET_MORE_COMICS_LIST;
}

export interface SetFilter {
  type: HomeActionTypes.SET_FILTER;
  payload: string[];
}

export type HomeActions =
  | GetComicList
  | GetComicListSuccess
  | GetComicListFail
  | CancelGetComicList
  | CancelGetComicList
  | GetMoreComicList
  | SetFilter;

export function getComicList(): GetComicList {
  return {
    type: HomeActionTypes.GET_COMICS_LIST
  };
}

export function getMoreComicList(): GetMoreComicList {
  return {
    type: HomeActionTypes.GET_MORE_COMICS_LIST
  };
}

export function cancelGetComicList(): CancelGetComicList {
  return {
    type: HomeActionTypes.GET_COMICS_LIST_CANCELED
  };
}

export function setFilter(payload: string[]): SetFilter {
  return {
    type: HomeActionTypes.SET_FILTER,
    payload
  };
}

export const HomeActionCreators = {
  getComicList,
  getMoreComicList,
  cancelGetComicList,
  setFilter
};
