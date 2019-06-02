export enum HomeActionTypes {
  GET_COMICS_LIST = 'GET_COMICS_LIST',
  GET_COMICS_LIST_SUCCESS = 'GET_COMICS_LIST_SUCCESS',
  GET_COMICS_LIST_FAIL = 'GET_COMICS_LIST_FAIL',
  GET_COMICS_LIST_CANCELED = 'GET_COMICS_LIST_CANCELED',
  SET_FILTER = 'SET_FILTER'
}

export interface GetComicList {
  type: HomeActionTypes.GET_COMICS_LIST;
}

export type HomeActions = GetComicList;

export function getComicList(): GetComicList {
  return {
    type: HomeActionTypes.GET_COMICS_LIST
  };
}

export const HomeActionCreators = {
  getComicList
};
