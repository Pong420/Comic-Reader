import { Action } from 'redux';
import { GetComicDataParam, ComicData, ApiError } from '../../typings';

export enum ComicActionTypes {
  GET_COMIC = 'GET_COMIC',
  GET_COMIC_SUCCESS = 'GET_COMIC_SUCCESS',
  GET_COMIC_FAIL = 'GET_COMIC_FAIL',
  GET_COMIC_CANCELED = 'GET_COMIC_CANCELED'
}

export interface GetComic extends Action {
  type: ComicActionTypes.GET_COMIC;
  payload: GetComicDataParam;
}

export interface GetComicSuccess extends Action {
  type: ComicActionTypes.GET_COMIC_SUCCESS;
  payload: ComicData;
}

export interface GetComicFail extends Action {
  type: ComicActionTypes.GET_COMIC_FAIL;
  payload: ApiError;
}

export interface GetComicCanceled extends Action {
  type: ComicActionTypes.GET_COMIC_CANCELED;
}

export type ComicActions =
  | GetComic
  | GetComicSuccess
  | GetComicFail
  | GetComicCanceled;

export function getComic(payload: GetComicDataParam): GetComic {
  return {
    type: ComicActionTypes.GET_COMIC,
    payload
  };
}

export function cancelGetComic(): GetComicCanceled {
  return {
    type: ComicActionTypes.GET_COMIC_CANCELED
  };
}

export const ComicActionCreators = {
  getComic(payload: GetComicDataParam): GetComic {
    return {
      type: ComicActionTypes.GET_COMIC,
      payload
    };
  },
  cancelGetComic(): GetComicCanceled {
    return {
      type: ComicActionTypes.GET_COMIC_CANCELED
    };
  }
};
