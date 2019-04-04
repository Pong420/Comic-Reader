import { ComicItemList, GetComicListParam, ApiError } from '../../typings';

export enum HomeActionTypes {
  GET_COMICS_LIST = 'GET_COMICS_LIST',
  GET_MORE_COMICS_LIST = 'GET_MORE_COMICS_LIST',
  GET_COMICS_LIST_SUCCESS = 'GET_COMICS_LIST_SUCCESS',
  GET_COMICS_LIST_FAIL = 'GET_COMICS_LIST_FAIL',
  GET_COMICS_LIST_CANCELED = 'GET_COMICS_LIST_CANCELED',
  SET_FILTER = 'SET_FILTER'
}

export interface GetComicList {
  type: HomeActionTypes.GET_COMICS_LIST;
  payload: GetComicListParam;
}

export interface GetMoreComicList {
  type: HomeActionTypes.GET_MORE_COMICS_LIST;
  payload: GetComicListParam;
}

export interface GetComicListSuccess {
  type: HomeActionTypes.GET_COMICS_LIST_SUCCESS;
  payload: ComicItemList;
}

export interface GetComicListFailed {
  type: HomeActionTypes.GET_COMICS_LIST_FAIL;
  payload: ApiError;
}

export interface GetComicListCanceled {
  type: HomeActionTypes.GET_COMICS_LIST_CANCELED;
}

export interface SetFilter {
  type: HomeActionTypes.SET_FILTER;
  payload: string[];
}

export type HomeActions =
  | GetComicList
  | GetMoreComicList
  | GetComicListSuccess
  | GetComicListFailed
  | GetComicListCanceled
  | SetFilter;

export const HomeActionCreators = {
  getComicList(payload: GetComicListParam): GetComicList {
    return {
      type: HomeActionTypes.GET_COMICS_LIST,
      payload
    };
  },
  getMoreComicList(payload: GetComicListParam): GetMoreComicList {
    return {
      type: HomeActionTypes.GET_MORE_COMICS_LIST,
      payload
    };
  },
  cancelGetComicList(): GetComicListCanceled {
    return {
      type: HomeActionTypes.GET_COMICS_LIST_CANCELED
    };
  },
  setFilter(payload: string[]): SetFilter {
    return {
      type: HomeActionTypes.SET_FILTER,
      payload
    };
  }
};
