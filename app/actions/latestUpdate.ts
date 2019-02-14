import { ComicItemList } from '../../typing';

export enum LatestUpdateKeys {
  SET_COMICS = 'SET_COMICS'
}

interface SetComicAction {
  type: LatestUpdateKeys.SET_COMICS;
  payload: {
    comicList: ComicItemList;
  };
}

export type LatestUpdateTypes = SetComicAction;

export function setComics(comicList: ComicItemList) {
  return {
    type: LatestUpdateKeys.SET_COMICS,
    payload: {
      comicList
    }
  };
}

export default { setComics };
