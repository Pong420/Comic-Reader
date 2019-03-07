import { Action } from 'redux';
import { AxiosError } from 'axios';
import { ComicItemList, GetComicListParam } from '../../../typing';

export enum ComicListTypes {
  GET_COMICS_LIST = 'GET_COMICS_LIST',
  GET_COMICS_LIST_FAILED = 'GET_COMICS_LIST_FAILED',
  GET_COMICS_LIST_CANCELED = 'GET_COMICS_LIST_CANCELED',
  SET_COMICS_LIST = 'SET_COMICS_LIST',
  ADD_COMICS_LIST = 'ADD_COMICS_LIST',
  ADD_COMICS_LIST_PLACE_HOLDER = 'ADD_COMICS_LIST_PLACE_HOLDER',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
  SET_FILTER = 'SET_FILTER',
  SET_NO_MORE_COMIC_RESULT = 'SET_NO_MORE_COMIC_RESULT'
}

export interface AddComicsPayload {
  comicList: ComicItemList;
  page?: number;
  from?: number;
  to?: number;
}

export interface GetComicList extends Action {
  type: ComicListTypes.GET_COMICS_LIST;
  payload: GetComicListParam;
}

export interface GetComicListFailed extends Action {
  type: ComicListTypes.GET_COMICS_LIST_FAILED;
  payload: AxiosError;
}

export interface GetComicListCanceled extends Action {
  type: ComicListTypes.GET_COMICS_LIST_CANCELED;
}

export interface AddComicList extends Action {
  type: ComicListTypes.ADD_COMICS_LIST;
  payload: AddComicsPayload;
}

export interface AddComicListPlaceHolder extends Action {
  type: ComicListTypes.ADD_COMICS_LIST_PLACE_HOLDER;
  payload: AddComicsPayload;
}

export type ComicListActions =
  | GetComicList
  | GetComicListFailed
  | GetComicListCanceled
  | AddComicList
  | AddComicListPlaceHolder;

export function getComicList(payload: GetComicListParam): GetComicList {
  return {
    type: ComicListTypes.GET_COMICS_LIST,
    payload
  };
}

export function addComics(payload: AddComicsPayload): AddComicList {
  return {
    type: ComicListTypes.ADD_COMICS_LIST,
    payload
  };
}

export const ComicListActionCreators = {
  getComicList,
  addComics
};
