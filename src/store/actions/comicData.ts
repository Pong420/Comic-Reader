import { ApiError, Schema$ComicData } from '../../typings';

export enum ComicDataActionTypes {
  GET_COMIC_DATA = 'GET_COMIC_DATA',
  GET_COMIC_DATA_SUCCESS = 'GET_COMIC_DATA_SUCCESS',
  GET_COMIC_DATA_FAILURE = 'GET_COMIC_DATA_FAILURE'
}

export interface GetComicData {
  type: ComicDataActionTypes.GET_COMIC_DATA;
  payload: string; // comicID
}

export interface GetComicDataSuccess {
  type: ComicDataActionTypes.GET_COMIC_DATA_SUCCESS;
  payload: Schema$ComicData;
}

export interface GetComicDataFailure {
  type: ComicDataActionTypes.GET_COMIC_DATA_FAILURE;
  payload: ApiError;
}

export type ComicDataActions =
  | GetComicData
  | GetComicDataSuccess
  | GetComicDataFailure;

export function getComicData(payload: GetComicData['payload']): GetComicData {
  return {
    type: ComicDataActionTypes.GET_COMIC_DATA,
    payload
  };
}

export const ComicDataActionCreators = {
  getComicData
};
