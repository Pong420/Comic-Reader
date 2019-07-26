import { Schema$ComicItem, ApiError } from '../../typings';

export enum ComicsActionTypes {
  GET_COMICS = 'GET_COMICS',
  GET_COMICS_SUCCESS = 'GET_COMICS_SUCCESS',
  GET_COMICS_FAILURE = 'GET_COMICS_FAILURE',
  GET_MORE_COMICS = 'GET_MORE_COMICS',
  SET_FILTER = 'SET_FILTER'
}

export interface GetComics {
  type: ComicsActionTypes.GET_COMICS;
}

export interface GetComicsSuccess {
  type: ComicsActionTypes.GET_COMICS_SUCCESS;
  payload: Schema$ComicItem[];
}

export interface GetComicsFail {
  type: ComicsActionTypes.GET_COMICS_FAILURE;
  payload: ApiError;
}

export interface GetMoreComics {
  type: ComicsActionTypes.GET_MORE_COMICS;
}

export interface SetFIlter {
  type: ComicsActionTypes.SET_FILTER;
  payload: {
    index: number;
    value: string;
  };
}

export type ComicsActions =
  | GetComics
  | GetComicsSuccess
  | GetComicsFail
  | GetMoreComics
  | SetFIlter;

export function getComics(): GetComics {
  return {
    type: ComicsActionTypes.GET_COMICS
  };
}

export function getMoreComics(): GetMoreComics {
  return {
    type: ComicsActionTypes.GET_MORE_COMICS
  };
}

export function setFilter(payload: SetFIlter['payload']): SetFIlter {
  return {
    type: ComicsActionTypes.SET_FILTER,
    payload
  };
}

export const ComicsCreators = {
  getComics,
  getMoreComics,
  setFilter
};
