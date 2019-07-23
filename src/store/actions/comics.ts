import { Schema$ComicItem, ApiError } from '../../typings';

export enum ComicsActionTypes {
  GET_COMICS = 'GET_COMICS',
  GET_COMICS_SUCCESS = 'GET_COMICS_SUCCESS',
  GET_COMICS_FAILURE = 'GET_COMICS_FAILURE',
  GET_MORE_COMICS = 'GET_MORE_COMICS'
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

export type ComicsActions =
  | GetComics
  | GetComicsSuccess
  | GetComicsFail
  | GetMoreComics;

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

export const ComicsCreators = {
  getComics,
  getMoreComics
};
