import { BookmarkItem, Bookmarks } from '../../typing';
import { getComicData } from '../api';

export enum BookmarkKeys {
  SET_BOOKMARK = 'SET_BOOKMARK',
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
  SAVE_BOOKMARK = 'SAVE_BOOKMARK'
}

export interface AddBookMarkPayload {
  bookmark: BookmarkItem;
}

interface SetBookmarkAction {
  type: BookmarkKeys.SET_BOOKMARK;
  payload: {
    bookmarks: Bookmarks;
  };
}

interface AddBookmarkAction {
  type: BookmarkKeys.ADD_BOOKMARK;
  payload: {
    comicID: string;
    bookmarkItem: BookmarkItem;
  };
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
  setBookmark: (bookmarks: Bookmarks) => void;
  addBookmark: (comicID: string) => void;
  removeBookmark: (comicID: string) => void;
  saveBookmark: () => void;
};

export function setBookmark(bookmarks: Bookmarks) {
  return dispatch => {
    dispatch({
      type: BookmarkKeys.SET_BOOKMARK,
      payload: {
        bookmarks
      }
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
  return dispatch => {
    dispatch(addBookmark_(comicID, null));
    dispatch(saveBookmark());

    getComicData({
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
  return dispatch => {
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
} as BookmarkActions;
