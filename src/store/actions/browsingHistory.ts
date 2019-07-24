import { ApiError, Schema$GridData } from '../../typings';

export enum BrowsingHistoryActionTypes {
  ADD_BROWSING_HISTORY_SUCCESS = 'ADD_BROWSING_HISTORY_SUCCESS',
  ADD_BROWSING_HISTORY_FAILURE = 'ADD_BROWSING_HISTORY_FAILURE',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY = 'REFETCH_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY_SUCCESS = 'REFETCH_BROWSING_HISTORY_SUCCESS',
  REFETCH_BROWSING_HISTORY_FAILURE = 'REFETCH_BROWSING_HISTORY_FAILURE',
  UPDATE_BROWSING_HISTORY_SELECTION = 'UPDATE_BROWSING_HISTORY_SELECTION',
  TOGGLE_BROWSING_HISTORY_SELECTION = 'TOGGLE_BROWSING_HISTORY_SELECTION'
}

export interface AddBrowsingHistorySuccess {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS;
  payload: Schema$GridData;
}

export interface AddBrowsingHistoryFailure {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_FAILURE;
  payload: ApiError;
}

export interface RemoveBrowsingHistory {
  type: BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY;
  payload: string | string[];
}

export interface RefetchBrowsingHistory {
  type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY;
  payload: string;
}

export interface RefetchBrowsingHistorySuccess {
  type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS;
  payload: Schema$GridData;
}

export interface RefetchBrowsingHistoryFailure {
  type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_FAILURE;
  payload: ApiError;
}

export interface UpdateBrowsingHistorySelection {
  type: BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY_SELECTION;
  payload: string[];
}

export interface ToggleBrowsingHistorySelection {
  type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECTION;
  payload?: boolean;
}

export type BrowsingHistoryActions =
  | AddBrowsingHistorySuccess
  | AddBrowsingHistoryFailure
  | RemoveBrowsingHistory
  | RefetchBrowsingHistory
  | RefetchBrowsingHistorySuccess
  | RefetchBrowsingHistoryFailure
  | ToggleBrowsingHistorySelection
  | UpdateBrowsingHistorySelection;

export function removeBrowsingHistory(
  payload: string | string[]
): RemoveBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
    payload
  };
}

export function refetchBrowsingHistory(
  payload: string
): RefetchBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY,
    payload
  };
}

export function toggleBrowsingHistorySelection(
  payload?: boolean
): ToggleBrowsingHistorySelection {
  return {
    type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECTION,
    payload
  };
}

export function updateBrowsingHistorySelection(
  payload: string[]
): UpdateBrowsingHistorySelection {
  return {
    type: BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY_SELECTION,
    payload
  };
}

export const BrowsingHistoryActionCreators = {
  removeBrowsingHistory,
  refetchBrowsingHistory,
  toggleBrowsingHistorySelection,
  updateBrowsingHistorySelection
};
