import { Schema$GridData } from '../../typings';

export enum BrowsingHistoryActionTypes {
  ADD_BROWSING_HISTORY_SUCCESS = 'ADD_BROWSING_HISTORY_SUCCESS',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY = 'REFETCH_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY_SUCCESS = 'REFETCH_BROWSING_HISTORY_SUCCESS',
  UPDATE_BROWSING_HISTORY_SELECTION = 'UPDATE_BROWSING_HISTORY_SELECTION',
  TOGGLE_BROWSING_HISTORY_SELECTION = 'TOGGLE_BROWSING_HISTORY_SELECTION'
}

export interface Payload$BrowsingHistory {
  comicID: string;
  chapterID: string;
}

export interface AddBrowsingHistorySuccess {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS;
  payload: Schema$GridData;
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

export interface UpdateBrowsingHistroySelection {
  type: BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY_SELECTION;
  payload: string[];
}

export interface ToggleBrowsingHistorySelection {
  type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECTION;
  payload?: boolean;
}

export type BrowsingHistoryActions =
  | AddBrowsingHistorySuccess
  | RemoveBrowsingHistory
  | RefetchBrowsingHistory
  | RefetchBrowsingHistorySuccess
  | ToggleBrowsingHistorySelection
  | UpdateBrowsingHistroySelection;

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

export function updateBrowsingHistroySelection(
  payload: string[]
): UpdateBrowsingHistroySelection {
  return {
    type: BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY_SELECTION,
    payload
  };
}

export const BrowsingHistoryActionCreators = {
  removeBrowsingHistory,
  refetchBrowsingHistory,
  toggleBrowsingHistorySelection,
  updateBrowsingHistroySelection
};
