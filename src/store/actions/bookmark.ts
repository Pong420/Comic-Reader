import { Schema$GridData, Param$ComicData } from '../../typings';

export enum BookmarkActionTypes {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
  REFETCH_BOOKMARK = 'REFETCH_BOOKMARK',
  REFETCH_BOOKMARK_SUCCESS = 'REFETCH_BOOKMARK_SUCCESS',
  UPDATE_BOOKMARK_SELECTION = 'UPDATE_BOOKMARK_SELECTION',
  TOGGLE_BOOKMARK_SELECTION = 'TOGGLE_BOOKMARK_SELECTION'
}

export interface AddBookmark {
  type: BookmarkActionTypes.ADD_BOOKMARK;
  payload: Param$ComicData;
}

export interface AddBookmarkSuccess {
  type: BookmarkActionTypes.ADD_BOOKMARK_SUCCESS;
  payload: Schema$GridData;
}

export interface RemoveBookmark {
  type: BookmarkActionTypes.REMOVE_BOOKMARK;
  payload: string | string[];
}

export interface RefetchBookmark {
  type: BookmarkActionTypes.REFETCH_BOOKMARK;
  payload: string;
}

export interface RefetchBookmarkSuccess {
  type: BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS;
  payload: Schema$GridData;
}

export interface UpdateBookmarkSelection {
  type: BookmarkActionTypes.UPDATE_BOOKMARK_SELECTION;
  payload: string[];
}

export interface ToggleBookmarkSelection {
  type: BookmarkActionTypes.TOGGLE_BOOKMARK_SELECTION;
  payload?: boolean;
}

export type BookmarkActions =
  | AddBookmark
  | AddBookmarkSuccess
  | RemoveBookmark
  | RefetchBookmark
  | RefetchBookmarkSuccess
  | UpdateBookmarkSelection
  | ToggleBookmarkSelection;

export function addBookmark(comicID: string): AddBookmark {
  return {
    type: BookmarkActionTypes.ADD_BOOKMARK,
    payload: { comicID }
  };
}

export function removeBookmark(payload: string | string[]): RemoveBookmark {
  return {
    type: BookmarkActionTypes.REMOVE_BOOKMARK,
    payload
  };
}

export function refetchBookmark(payload: string): RefetchBookmark {
  return {
    type: BookmarkActionTypes.REFETCH_BOOKMARK,
    payload
  };
}

export function updateBookmarkSelection(
  payload: string[]
): UpdateBookmarkSelection {
  return {
    type: BookmarkActionTypes.UPDATE_BOOKMARK_SELECTION,
    payload
  };
}

export function toggleBookmarkSelection(
  payload?: boolean
): ToggleBookmarkSelection {
  return {
    type: BookmarkActionTypes.TOGGLE_BOOKMARK_SELECTION,
    payload
  };
}

export const BookmarkActionCreators = {
  addBookmark,
  removeBookmark,
  refetchBookmark,
  toggleBookmarkSelection,
  updateBookmarkSelection
};
