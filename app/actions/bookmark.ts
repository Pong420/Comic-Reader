import { BookmarkItem, Bookmarks } from '../../typing';

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
  payload: AddBookMarkPayload;
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

export function addBookmark(bookmark: BookmarkItem) {
  return dispatch => {
    dispatch({
      type: BookmarkKeys.ADD_BOOKMARK,
      payload: {
        bookmark
      }
    });

    dispatch(saveBookmark());
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

export type BookmarkActionCreator = {
  setBookmark: (bookmarks: Bookmarks) => void;
  addBookmark: (bookmark: BookmarkItem) => void;
  removeBookmark: (comicID: string) => void;
  saveBookmark: () => void;
};

export default {
  setBookmark,
  addBookmark,
  removeBookmark,
  saveBookmark
};
