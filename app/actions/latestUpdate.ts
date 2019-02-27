import { Dispatch } from 'redux';
import { ComicItemList } from '../../typing';

export enum LatestUpdateKeys {
  SET_COMICS = 'SET_COMICS',
  ADD_COMICS = 'ADD_COMICS',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER'
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

export type LatestUpdateActions = {
  setComics: (comicList: ComicItemList) => void;
  addComics: (args: AddComicsPayload) => void;
  setPageNumber: (page: number) => void;
};

export function setComics(comicList: ComicItemList): SetComicAction {
  return {
    type: LatestUpdateKeys.SET_COMICS,
    payload: {
      comicList
    }
  };
}

export function addComics({ page, comicList, from, to }: AddComicsPayload) {
  return (dispatch: Dispatch) => {
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

export function setPageNumber(page: number): SetPageNoAction {
  return {
    type: LatestUpdateKeys.SET_PAGE_NUMBER,
    payload: {
      page
    }
  };
}

export default { setComics, addComics, setPageNumber } as LatestUpdateActions;
