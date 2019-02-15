import { ComicItemList } from '../../typing';

export enum LatestUpdateKeys {
  SET_COMICS = 'SET_COMICS',
  ADD_COMICS = 'ADD_COMICS'
}

interface ComicAction {
  type: LatestUpdateKeys.SET_COMICS | LatestUpdateKeys.ADD_COMICS;
  payload: {
    comicList: ComicItemList;
  };
}

export type LatestUpdateTypes = ComicAction;

export function comicAction(comicList: ComicItemList) {
  return {
    type: LatestUpdateKeys.SET_COMICS,
    payload: {
      comicList
    }
  };
}

export function setComics(comicList) {
  return comicAction(comicList);
}

export function updateComics(comicList) {
  return comicAction(comicList);
}

export default { setComics, updateComics };
