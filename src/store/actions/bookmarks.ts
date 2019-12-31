import { UnionCRUDActions, createCRUDActions } from '@pong420/redux-crud';
import { useActions } from '../../hooks/useActions';
import { SelectionTypes } from '../selection';

const [actions, actionsTypes] = createCRUDActions<Schema$Bookmark, 'comicID'>()(
  {
    createBookmark: ['CREATE', 'CREATE_BOOKMARK'],
    deleteBookmark: ['DELETE', 'DELETE_BOOKMARK'],
    updateBookmark: ['UPDATE', 'UPDATE_BOOKMARK']
  }
);

export const BookmarkActionTypes = {
  ...actionsTypes,
  TOGGLE_SELECTABLE_BOOKMARK: 'TOGGLE_SELECTABLE_BOOKMARK' as const,
  TOGGLE_SELECT_ALL_BOOKMARK: 'TOGGLE_SELECT_ALL_BOOKMARK' as const,
  TOGGLE_SELECTION_BOOKMARK: 'TOGGLE_SELECTION_BOOKMARK' as const,
  SET_SELECTION_BOOKMARK: 'SET_SELECTION_BOOKMARK' as const
};

function toggleSelectable() {
  return {
    type: BookmarkActionTypes.TOGGLE_SELECTABLE_BOOKMARK,
    sub: SelectionTypes.TOGGLE_SELECTABLE as const
  };
}

function toggleSelectAll() {
  return {
    type: BookmarkActionTypes.TOGGLE_SELECT_ALL_BOOKMARK,
    sub: SelectionTypes.TOGGLE_SELECT_ALL as const
  };
}

function toggleSelection(payload: string) {
  return {
    type: BookmarkActionTypes.TOGGLE_SELECTION_BOOKMARK,
    sub: SelectionTypes.TOGGLE_SELECTION as const,
    payload
  };
}

function setSelection(payload: string[]) {
  return {
    type: BookmarkActionTypes.SET_SELECTION_BOOKMARK,
    sub: SelectionTypes.SET_SELECTION as const,
    payload
  };
}

export const useBookmarkActions = () => useActions(actions);

export const useBookmarkSelection = () =>
  useActions({
    toggleSelectable,
    toggleSelectAll,
    toggleSelection,
    setSelection
  });

export type BookmarkActions =
  | UnionCRUDActions<typeof actions>
  | UnionCRUDActions<ReturnType<typeof useBookmarkSelection>>;
