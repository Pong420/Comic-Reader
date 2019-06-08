import { Schema$GridData } from '../../typings';

export enum BrowsingHistoryActionTypes {
  ADD_BROWSING_HISTORY_SUCCESS = 'ADD_BROWSING_HISTORY_SUCCESS',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  REMOVE_ALL_BROWSING_HISTORY = 'REMOVE_ALL_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY = 'REFETCH_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY_SUCCESS = 'REFETCH_BROWSING_HISTORY_SUCCESS',
  TOGGLE_BROWSING_HISTORY_REMOVABLE = 'TOGGLE_BROWSING_HISTORY_REMOVABLE'
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
  payload: string;
}

export interface RemoveAllBrowsingHistory {
  type: BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY;
}

export interface RefetchBrowsingHistory {
  type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY;
  payload: Payload$BrowsingHistory;
}

export interface RefetchBrowsingHistorySuccess {
  type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS;
  payload: Schema$GridData;
}

export interface ToggleBrowsingHistoryRemovable {
  type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE;
  payload?: boolean;
}

export type BrowsingHistoryActions =
  | AddBrowsingHistorySuccess
  | RemoveBrowsingHistory
  | RemoveAllBrowsingHistory
  | RefetchBrowsingHistory
  | RefetchBrowsingHistorySuccess
  | ToggleBrowsingHistoryRemovable;

export function removeBrowsingHistory(comicID: string): RemoveBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
    payload: comicID
  };
}

export function removeAllBrowsingHistory(): RemoveAllBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY
  };
}

export function refetchBrowsingHistory(
  payload: Payload$BrowsingHistory
): RefetchBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY,
    payload
  };
}

export function toggleBrowsingHistoryRemovable(
  payload?: boolean
): ToggleBrowsingHistoryRemovable {
  return {
    type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE,
    payload
  };
}

export const BrowsingHistoryActionCreators = {
  removeBrowsingHistory,
  removeAllBrowsingHistory,
  refetchBrowsingHistory,
  toggleBrowsingHistoryRemovable
};
