import { ComicItemList } from '../../typing';

export enum LatestUpdateKeys {
  SET_COMICS = 'SET_COMICS',
  ADD_COMICS = 'ADD_COMICS',
  SET_PAGE_NUMBER = 'UPDATE_PAGE_NUMBER'
}

interface ComicAction {
  type: LatestUpdateKeys.SET_COMICS | LatestUpdateKeys.ADD_COMICS;
  payload: {
    comicList: ComicItemList;
  };
}

export interface AddComicsPayload {
  comicList: ComicItemList;
  page: number;
}

interface SetPageNoAction {
  type: LatestUpdateKeys.SET_PAGE_NUMBER;
  payload: {
    page: number;
  };
}

export type LatestUpdateTypes = ComicAction | SetPageNoAction;

export function comicAction(type: LatestUpdateKeys, comicList: ComicItemList) {
  return {
    type,
    payload: {
      comicList
    }
  };
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
  return comicAction(LatestUpdateKeys.SET_COMICS, comicList);
}

export function addComics({ comicList, page }: AddComicsPayload) {
  return dispatch => {
    dispatch(setPageNumber(page));
    dispatch(comicAction(LatestUpdateKeys.ADD_COMICS, comicList));
  };
}

export default { setComics, addComics, setPageNumber };
