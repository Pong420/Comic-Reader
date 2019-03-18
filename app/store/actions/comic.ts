import { Action } from 'redux';
import { GetComicDataParam, ComicData, ApiError } from '../../../typing';

export enum ComicActionTypes {
  GET_COMIC = 'GET_COMIC',
  GET_COMIC_SUCCESS = 'GET_COMIC_SUCCESS',
  GET_COMIC_FAIL = 'GET_COMIC_FAIL',
  GET_COMIC_CANCELED = 'GET_COMIC_CANCELED',
  RESET_COMIC_STATE = 'RESET_COMIC_STATE'
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

export interface CancelGetComic extends Action {
  type: ComicActionTypes.GET_COMIC_CANCELED;
}

export interface ResetComicState extends Action {
  type: ComicActionTypes.RESET_COMIC_STATE;
}

export type ComicActions =
  | GetComic
  | GetComicSuccess
  | GetComicFail
  | CancelGetComic
  | ResetComicState;

export function getComic(payload: GetComicDataParam): GetComic {
  return {
    type: ComicActionTypes.GET_COMIC,
    payload
  };
}

export function getComicSuccess(payload: ComicData): GetComicSuccess {
  return {
    type: ComicActionTypes.GET_COMIC_SUCCESS,
    payload
  };
}

export function cancelGetComic(): CancelGetComic {
  return {
    type: ComicActionTypes.GET_COMIC_CANCELED
  };
}

export function resetComicState(): ResetComicState {
  return {
    type: ComicActionTypes.RESET_COMIC_STATE
  };
}

export const ComicActionCreators = {
  getComic,
  getComicSuccess,
  cancelGetComic,
  resetComicState
};
