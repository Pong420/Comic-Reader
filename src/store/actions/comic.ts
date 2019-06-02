import { ApiError, Schema$ComicData } from '../../typings';

export enum ComicActionTypes {
  GET_COMIC = 'GET_COMIC',
  GET_COMIC_SUCCESS = 'GET_COMIC_SUCCESS',
  GET_COMIC_FAIL = 'GET_COMIC_FAIL',
  GET_COMIC_CANCELED = 'GET_COMIC_CANCELED'
}

export interface GetComic {
  type: ComicActionTypes.GET_COMIC;
  payload: string; // comicID
}

export interface GetComicSuccess {
  type: ComicActionTypes.GET_COMIC_SUCCESS;
  payload: Schema$ComicData;
}

export interface GetComicFail {
  type: ComicActionTypes.GET_COMIC_FAIL;
  payload: ApiError;
}

export interface CancelGetComic {
  type: ComicActionTypes.GET_COMIC_CANCELED;
}

export type ComicActions =
  | GetComic
  | GetComicSuccess
  | GetComicFail
  | CancelGetComic
  | CancelGetComic;

export function getComic(payload: string): GetComic {
  return {
    type: ComicActionTypes.GET_COMIC,
    payload
  };
}

export function cancelGetComic(): CancelGetComic {
  return {
    type: ComicActionTypes.GET_COMIC_CANCELED
  };
}

export const ComicActionCreators = {
  getComic,
  cancelGetComic
};
