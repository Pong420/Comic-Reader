import { BookmarkItem, Bookmarks } from '../../typing';

export enum BookmarkKeys {
  SET_BOOKMARK = 'SET_BOOKMARK',
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  SAVE_BOOKMARK = 'SAVE_BOOKMARK'
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

interface SaveBookmarkAction {
  type: BookmarkKeys.SAVE_BOOKMARK;
}

export interface AddBookMarkPayload {
  bookmark: BookmarkItem;
}

export type BookmarkTypes =
  | SetBookmarkAction
  | AddBookmarkAction
  | SaveBookmarkAction;

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

export function addBookmark(bookmarks: Bookmarks) {
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

export function saveBookmark() {
  return {
    type: BookmarkKeys.SAVE_BOOKMARK
  };
}

export default { setBookmark, addBookmark };
