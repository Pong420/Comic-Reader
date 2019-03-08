import { Action } from 'redux';
import { AxiosError } from 'axios';
import { ComicItemList, GetComicListParam } from '../../../typing';

export enum ComicListTypes {
  GET_COMICS_LIST = 'GET_COMICS_LIST',
  GET_COMICS_LIST_SUCCESS = 'GET_COMICS_LIST_SUCCESS',
  GET_COMICS_LIST_FAIL = 'GET_COMICS_LIST_FAIL',
  GET_COMICS_LIST_CANCELED = 'GET_COMICS_LIST_CANCELED',
  SET_FILTER = 'SET_FILTER'
}

export interface GetComicListSuccessPayload {
  comicList: ComicItemList;
  from?: number;
  to?: number;
}

export interface GetComicList extends Action {
  type: ComicListTypes.GET_COMICS_LIST;
  payload: GetComicListParam;
}

export interface GetComicListSuccess extends Action {
  type: ComicListTypes.GET_COMICS_LIST_SUCCESS;
  payload: GetComicListSuccessPayload;
}

export interface GetComicListFailed extends Action {
  type: ComicListTypes.GET_COMICS_LIST_FAIL;
  payload: AxiosError;
}

export interface GetComicListCanceled extends Action {
  type: ComicListTypes.GET_COMICS_LIST_CANCELED;
}

export interface SetFilter extends Action {
  type: ComicListTypes.SET_FILTER;
  payload: string[];
}

export type ComicListActions =
  | GetComicList
  | GetComicListSuccess
  | GetComicListFailed
  | GetComicListCanceled
  | SetFilter;

export function getComicList(payload: GetComicListParam): GetComicList {
  return {
    type: ComicListTypes.GET_COMICS_LIST,
    payload
  };
}

export function getComicsListSuccess(
  payload: GetComicListSuccessPayload
): GetComicListSuccess {
  return {
    type: ComicListTypes.GET_COMICS_LIST_SUCCESS,
    payload
  };
}

export function setFilter(payload: string[]): SetFilter {
  return {
    type: ComicListTypes.SET_FILTER,
    payload
  };
}

export function cancelGetComicList(): GetComicListCanceled {
  return {
    type: ComicListTypes.GET_COMICS_LIST_CANCELED
  };
}

export const ComicListActionCreators = {
  getComicList,
  getComicsListSuccess,
  setFilter,
  cancelGetComicList
};
