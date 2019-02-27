import { Dispatch } from 'redux';
import { BookmarkItem } from '../../typing';
import { getComicDataAPI } from '../apis';

export enum BookmarkKeys {
  SET_BOOKMARK = 'SET_BOOKMARK',
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
  SAVE_BOOKMARK = 'SAVE_BOOKMARK'
}

export interface BookMarkPayload {
  comicID: string;
  bookmarkItem: BookmarkItem;
}

interface SetBookmarkAction {
  type: BookmarkKeys.SET_BOOKMARK;
  payload: BookMarkPayload;
}

interface AddBookmarkAction {
  type: BookmarkKeys.ADD_BOOKMARK;
  payload: BookMarkPayload;
}

interface RemoveBookmarkAction {
  type: BookmarkKeys.REMOVE_BOOKMARK;
  payload: {
    comicID: string;
  };
}

interface SaveBookmarkAction {
  type: BookmarkKeys.SAVE_BOOKMARK;
}

export type BookmarkTypes =
  | SetBookmarkAction
  | AddBookmarkAction
  | SaveBookmarkAction
  | RemoveBookmarkAction;

export type BookmarkActions = {
  setBookmark: typeof setBookmark;
  addBookmark: typeof addBookmark;
  removeBookmark: typeof removeBookmark;
  saveBookmark: typeof saveBookmark;
};

export function setBookmark(payload: BookMarkPayload) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: BookmarkKeys.SET_BOOKMARK,
      payload
    });

    dispatch(saveBookmark());
  };
}

function addBookmark_(comicID: string, bookmarkItem: BookmarkItem) {
  return {
    type: BookmarkKeys.ADD_BOOKMARK,
    payload: {
      comicID,
      bookmarkItem
    }
  };
}

export function addBookmark(comicID: string) {
  return (dispatch: Dispatch) => {
    dispatch(addBookmark_(comicID, null));
    dispatch(saveBookmark());

    getComicDataAPI({
      comicID
    }).then(data => {
      const { comicID, name, cover, latest, updateTime } = data;
      dispatch(
        addBookmark_(comicID, { comicID, name, cover, latest, updateTime })
      );
      dispatch(saveBookmark());
    });
  };
}

export function removeBookmark(comicID: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: BookmarkKeys.REMOVE_BOOKMARK,
      payload: {
        comicID
      }
    });

    dispatch(saveBookmark());
  };
}

export function saveBookmark() {
  return {
    type: BookmarkKeys.SAVE_BOOKMARK
  };
}

export default {
  setBookmark,
  addBookmark,
  removeBookmark,
  saveBookmark
};
