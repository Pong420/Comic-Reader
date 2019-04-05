import { GridData } from '../../typings';

export enum BookmarkActionTypes {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
  REMOVE_ALL_BOOKMARK = 'REMOVE_ALL_BOOKMARK',
  REFETCH_BOOKMARK = 'REFETCH_BOOKMARK',
  REFETCH_BOOKMARK_SUCCESS = 'REFETCH_BOOKMARK_SUCCESS',
  TOGGLE_BOOKMARK_REMOVABLE = 'TOGGLE_BOOKMARK_REMOVABLE',
  SAVE_BOOKMARK = 'SAVE_BOOKMARK'
}

export interface AddBookmark {
  type: BookmarkActionTypes.ADD_BOOKMARK;
  payload: string;
}

export interface AddBookmarkSuccess {
  type: BookmarkActionTypes.ADD_BOOKMARK_SUCCESS;
  payload: GridData;
}

export interface RemoveBookmark {
  type: BookmarkActionTypes.REMOVE_BOOKMARK;
  payload: string;
}

export interface RemoveAllBookmark {
  type: BookmarkActionTypes.REMOVE_ALL_BOOKMARK;
}

export interface RefetchBookmark {
  type: BookmarkActionTypes.REFETCH_BOOKMARK;
  payload: string;
}

export interface RefetchBookmarkSuccess {
  type: BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS;
  payload: GridData;
}

export interface ToggleBookmarkRemovable {
  type: BookmarkActionTypes.TOGGLE_BOOKMARK_REMOVABLE;
  payload?: boolean;
}

export interface SaveBookmark {
  type: BookmarkActionTypes.SAVE_BOOKMARK;
}

export type BookmarkActions =
  | AddBookmark
  | AddBookmarkSuccess
  | RemoveBookmark
  | RemoveAllBookmark
  | RefetchBookmark
  | RefetchBookmarkSuccess
  | ToggleBookmarkRemovable
  | SaveBookmark;

export const BookmarkActionCreators = {
  addBookmark(comicID: string): AddBookmark {
    return {
      type: BookmarkActionTypes.ADD_BOOKMARK,
      payload: comicID
    };
  },
  removeBookmark(comicID: string): RemoveBookmark {
    return {
      type: BookmarkActionTypes.REMOVE_BOOKMARK,
      payload: comicID
    };
  },
  removeAllBookmark(): RemoveAllBookmark {
    return {
      type: BookmarkActionTypes.REMOVE_ALL_BOOKMARK
    };
  },
  refetchBookmark(comicID: string): RefetchBookmark {
    return {
      type: BookmarkActionTypes.REFETCH_BOOKMARK,
      payload: comicID
    };
  },
  toggleBookmarkRemovable(payload?: boolean): ToggleBookmarkRemovable {
    return {
      type: BookmarkActionTypes.TOGGLE_BOOKMARK_REMOVABLE,
      payload
    };
  }
};
