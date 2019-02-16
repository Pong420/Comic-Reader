import { ComicItemList } from '../../typing';

export enum LatestUpdateKeys {
  SET_COMICS = 'SET_COMICS',
  ADD_COMICS = 'ADD_COMICS',
  SET_PAGE_NUMBER = 'UPDATE_PAGE_NUMBER'
}

interface SetComicAction {
  type: LatestUpdateKeys.SET_COMICS;
  payload: {
    comicList: ComicItemList;
  };
}

interface AddComicAction {
  type: LatestUpdateKeys.ADD_COMICS;
  payload: AddComicsPayload;
}

interface SetPageNoAction {
  type: LatestUpdateKeys.SET_PAGE_NUMBER;
  payload: {
    page: number;
  };
}

export type LatestUpdateTypes =
  | SetComicAction
  | AddComicAction
  | SetPageNoAction;

export interface AddComicsPayload {
  comicList: ComicItemList;
  page: number;
  from?: number;
  to?: number;
}

export function setPageNumber(page: number) {
  return {
    type: LatestUpdateKeys.SET_PAGE_NUMBER,
    payload: {
      page
    }
  };
}

export function setComics(comicList: ComicItemList) {
  return {
    type: LatestUpdateKeys.SET_COMICS,
    payload: {
      comicList
    }
  };
}

export function addComics({ page, comicList, from, to }: AddComicsPayload) {
  return dispatch => {
    dispatch(setPageNumber(page));
    dispatch({
      type: LatestUpdateKeys.ADD_COMICS,
      payload: {
        comicList,
        from,
        to
      }
    });
  };
}

export default { setComics, addComics, setPageNumber };
