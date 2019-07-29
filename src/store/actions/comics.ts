import { Schema$ComicItem } from '../../typings';

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

export interface GetComicsFailure {
  type: ComicsActionTypes.GET_COMICS_FAILURE;
  payload: Schema$ComicItem[];
}

export interface GetMoreComics {
  type: ComicsActionTypes.GET_MORE_COMICS;
}

export interface SetFilter {
  type: ComicsActionTypes.SET_FILTER;
  payload:
    | []
    | {
        index: number;
        value: string;
      };
}

export type ComicsActions =
  | GetComics
  | GetComicsSuccess
  | GetComicsFailure
  | GetMoreComics
  | SetFilter;

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

export function setFilter(payload: SetFilter['payload']): SetFilter {
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
