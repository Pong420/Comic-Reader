import { Schema$GridData, Param$ComicData } from '../../typings';

export enum BookmarkActionTypes {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS',
  ADD_BOOKMARK_FAILURE = 'ADD_BOOKMARK_FAILURE',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
  REFETCH_BOOKMARK = 'REFETCH_BOOKMARK',
  REFETCH_BOOKMARK_SUCCESS = 'REFETCH_BOOKMARK_SUCCESS',
  REFETCH_BOOKMARK_FAILURE = 'REFETCH_BOOKMARK_FAILURE',
  UPDATE_BOOKMARK_SELECTION = 'UPDATE_BOOKMARK_SELECTION',
  TOGGLE_BOOKMARK_SELECTION = 'TOGGLE_BOOKMARK_SELECTION'
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
  payload: string | string[];
}

export interface RefetchBookmark {
  type: BookmarkActionTypes.REFETCH_BOOKMARK;
  payload: Param$ComicData;
}

export interface RefetchBookmarkSuccess {
  type: BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS;
  payload: Schema$GridData;
}

export interface RefetchBookmarkFailure {
  type: BookmarkActionTypes.REFETCH_BOOKMARK_FAILURE;
  payload: string;
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
  | AddBookmarkFailure
  | RemoveBookmark
  | RefetchBookmark
  | RefetchBookmarkSuccess
  | RefetchBookmarkFailure
  | UpdateBookmarkSelection
  | ToggleBookmarkSelection;

export function addBookmark(payload: AddBookmark['payload']): AddBookmark {
  return {
    type: BookmarkActionTypes.ADD_BOOKMARK,
    payload
  };
}

export function removeBookmark(
  payload: RemoveBookmark['payload']
): RemoveBookmark {
  return {
    type: BookmarkActionTypes.REMOVE_BOOKMARK,
    payload
  };
}

export function refetchBookmark(
  payload: RefetchBookmark['payload']
): RefetchBookmark {
  return {
    type: BookmarkActionTypes.REFETCH_BOOKMARK,
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

export function toggleBookmarkSelection(
  payload?: ToggleBookmarkSelection['payload']
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
