import { Schema$GridData } from '../../typings';

export enum BookmarkActionTypes {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS',
  ADD_BOOKMARK_FAILURE = 'ADD_BOOKMARK_FAILURE',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
  UPDATE_BOOKMARK = 'UPDATE_BOOKMARK',
  UPDATE_BOOKMARK_SELECTION = 'UPDATE_BOOKMARK_SELECTION',
  TOGGLE_BOOKMARK_SELECT_ALL = 'TOGGLE_BOOKMARK_SELECT_ALL',
  TOGGLE_BOOKMARK_SELECTABLE = 'TOGGLE_BOOKMARK_SELECTABLE'
}

export interface AddBookmark {
  type: BookmarkActionTypes.ADD_BOOKMARK;
  payload: string;
}

export interface AddBookmarkSuccess {
  type: BookmarkActionTypes.ADD_BOOKMARK_SUCCESS;
  payload: Schema$GridData;
}

export interface AddBookmarkFailure {
  type: BookmarkActionTypes.ADD_BOOKMARK_FAILURE;
  payload: string;
}

export interface RemoveBookmark {
  type: BookmarkActionTypes.REMOVE_BOOKMARK;
  payload?: string | string[];
}

export interface UpdateBookmark {
  type: BookmarkActionTypes.UPDATE_BOOKMARK;
  payload: Schema$GridData;
}

export interface UpdateBookmarkSelection {
  type: BookmarkActionTypes.UPDATE_BOOKMARK_SELECTION;
  payload: string;
}

export interface ToggleBookmarkSelectAll {
  type: BookmarkActionTypes.TOGGLE_BOOKMARK_SELECT_ALL;
  payload?: boolean;
}

export interface ToggleBookmarkSelectable {
  type: BookmarkActionTypes.TOGGLE_BOOKMARK_SELECTABLE;
  payload?: boolean;
}

export type BookmarkActions =
  | AddBookmark
  | AddBookmarkSuccess
  | AddBookmarkFailure
  | RemoveBookmark
  | UpdateBookmark
  | UpdateBookmarkSelection
  | ToggleBookmarkSelectAll
  | ToggleBookmarkSelectable;

export function addBookmark(payload: AddBookmark['payload']): AddBookmark {
  return {
    type: BookmarkActionTypes.ADD_BOOKMARK,
    payload
  };
}

export function removeBookmark(
  payload?: RemoveBookmark['payload']
): RemoveBookmark {
  return {
    type: BookmarkActionTypes.REMOVE_BOOKMARK,
    payload
  };
}

export function updateBookmark(
  payload: UpdateBookmark['payload']
): UpdateBookmark {
  return {
    type: BookmarkActionTypes.UPDATE_BOOKMARK,
    payload
  };
}

export function updateBookmarkSelection(
  payload: UpdateBookmarkSelection['payload']
): UpdateBookmarkSelection {
  return {
    type: BookmarkActionTypes.UPDATE_BOOKMARK_SELECTION,
    payload
  };
}

export function toggleBookmarkSelectAll(
  payload?: ToggleBookmarkSelectAll['payload']
): ToggleBookmarkSelectAll {
  return {
    type: BookmarkActionTypes.TOGGLE_BOOKMARK_SELECT_ALL,
    payload
  };
}

export function toggleBookmarkSelectable(
  payload?: ToggleBookmarkSelectable['payload']
): ToggleBookmarkSelectable {
  return {
    type: BookmarkActionTypes.TOGGLE_BOOKMARK_SELECTABLE,
    payload
  };
}

export const BookmarkActionCreators = {
  addBookmark,
  removeBookmark,
  updateBookmark,
  updateBookmarkSelection,
  toggleBookmarkSelectAll,
  toggleBookmarkSelectable
};
