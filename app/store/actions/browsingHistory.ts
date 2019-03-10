import { Action } from 'redux';
import { GridData } from '../../../typing';

export enum BrowsingHistoryActionTypes {
  ADD_BROWSING_HISTORY = 'ADD_BROWSING_HISTORY',
  ADD_BROWSING_HISTORY_SUCCESS = 'ADD_BROWSING_HISTORY_SUCCESS',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  REMOVE_ALL_BROWSING_HISTORY = 'REMOVE_ALL_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY = 'REFETCH_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY_SUCCESS = 'REFETCH_BROWSING_HISTORY_SUCCESS',
  TOGGLE_BROWSING_HISTORY_REMOVABLE = 'TOGGLE_BROWSING_HISTORY_REMOVABLE',
  SAVE_BROWSING_HISTORY = 'SAVE_BROWSING_HISTORY'
}

export interface BrowsingHistoryPayload {
  comicID: string;
  chapterID: string;
}

export interface BrowsingHistorySuccessPayload extends BrowsingHistoryPayload {
  gridData: GridData;
}

export interface AddBrowsingHistory extends Action {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY;
  payload: BrowsingHistoryPayload;
}

export interface AddBrowsingHistorySuccess extends Action {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS;
  payload: BrowsingHistorySuccessPayload;
}

export interface RemoveBrowsingHistory extends Action {
  type: BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY;
  payload: string;
}

export interface RemoveAllBrowsingHistory extends Action {
  type: BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY;
}

export interface RefetchBrowsingHistory extends Action {
  type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY;
  payload: BrowsingHistoryPayload;
}

export interface RefetchBrowsingHistorySuccess extends Action {
  type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS;
  payload: BrowsingHistorySuccessPayload;
}

export interface ToggleBrowsingHistoryRemovable extends Action {
  type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE;
  payload: boolean;
}

export interface SaveBrowsingHistory extends Action {
  type: BrowsingHistoryActionTypes.SAVE_BROWSING_HISTORY;
}

export type BrowsingHistoryActions =
  | AddBrowsingHistory
  | AddBrowsingHistorySuccess
  | RemoveBrowsingHistory
  | RemoveAllBrowsingHistory
  | RefetchBrowsingHistory
  | RefetchBrowsingHistorySuccess
  | ToggleBrowsingHistoryRemovable
  | SaveBrowsingHistory;

export function addBrowsingHistory(
  payload: BrowsingHistoryPayload
): AddBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY,
    payload
  };
}

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
  payload: BrowsingHistoryPayload
): RefetchBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY,
    payload
  };
}

export function toggleBrowsingHistoryRemovable(
  payload: boolean
): ToggleBrowsingHistoryRemovable {
  return {
    type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE,
    payload
  };
}

export const BrowsingHistoryActionCreators = {
  addBrowsingHistory,
  removeBrowsingHistory,
  removeAllBrowsingHistory,
  refetchBrowsingHistory,
  toggleBrowsingHistoryRemovable
};
