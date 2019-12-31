import { createCRUDActions, UnionCRUDActions } from '@pong420/redux-crud';
import { useActions } from '../../hooks/useActions';
import { SelectionTypes } from '../selection';

const [actions, actionsTypes] = createCRUDActions<
  Schema$BrowsingHistory,
  'comicID'
>()({
  createBrowsingHistory: ['CREATE', 'CREATE_BROWSING_HISTORY'],
  deleteBrowsingHistory: ['DELETE', 'DELETE_BROWSING_HISTORY'],
  updateBrowsingHistory: ['UPDATE', 'UPDATE_BROWSING_HISTORY']
});

export const BrowsingHistoryActionTypes = {
  ...actionsTypes,
  TOGGLE_SELECTABLE_BROWSING_HISTORY: 'TOGGLE_SELECTABLE_BROWSING_HISTORY' as const,
  TOGGLE_SELECT_ALL_BROWSING_HISTORY: 'TOGGLE_SELECT_ALL_BROWSING_HISTORY' as const,
  TOGGLE_SELECTION_BROWSING_HISTORY: 'TOGGLE_SELECTION_BROWSING_HISTORY' as const,
  SET_SELECTION_BROWSING_HISTORY: 'SET_SELECTION_BROWSING_HISTORY' as const
};

function toggleSelectable() {
  return {
    type: BrowsingHistoryActionTypes.TOGGLE_SELECTABLE_BROWSING_HISTORY,
    sub: SelectionTypes.TOGGLE_SELECTABLE as const
  };
}

function toggleSelectAll() {
  return {
    type: BrowsingHistoryActionTypes.TOGGLE_SELECT_ALL_BROWSING_HISTORY,
    sub: SelectionTypes.TOGGLE_SELECT_ALL as const
  };
}

function toggleSelection(payload: string) {
  return {
    type: BrowsingHistoryActionTypes.TOGGLE_SELECTION_BROWSING_HISTORY,
    sub: SelectionTypes.TOGGLE_SELECTION as const,
    payload
  };
}

function setSelection(payload: string[]) {
  return {
    type: BrowsingHistoryActionTypes.SET_SELECTION_BROWSING_HISTORY,
    sub: SelectionTypes.SET_SELECTION as const,
    payload
  };
}

export const useBrowsingHistoryActions = () => useActions(actions);

export const useBrowsingHistorySelection = () =>
  useActions({
    toggleSelectable,
    toggleSelectAll,
    toggleSelection,
    setSelection
  });

export type BrowsingHistoryActions =
  | UnionCRUDActions<typeof actions>
  | UnionCRUDActions<ReturnType<typeof useBrowsingHistorySelection>>;
