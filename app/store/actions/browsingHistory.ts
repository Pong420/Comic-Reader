import { Action } from 'redux';
import { BrowsingHistoryItem } from '../../../typing';

export enum BrowsingHistoryActionTypes {
  ADD_BROWSING_HISTORY = 'ADD_BROWSING_HISTORY',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  REMOVE_ALL_BROWSING_HISTORY = 'REMOVE_ALL_BROWSING_HISTORY',
  REFETCH_BROWSING_HISTORY = 'REFETCH_BROWSING_HISTORY',
  TOGGLE_BROWSING_HISTORY_REMOVABLE = 'TOGGLE_BROWSING_HISTORY_REMOVABLE',
  SAVE_BROWSING_HISTORY = 'SAVE_BROWSING_HISTORY'
}

export interface AddBrowsingHistoryPayload {
  comicData?: BrowsingHistoryItem;
  chapterIDs: string[];
  comicID: string;
}

export interface AddBrowsingHistory extends Action {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY;
  payload: AddBrowsingHistoryPayload;
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
  payload: AddBrowsingHistoryPayload;
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
  | RemoveBrowsingHistory
  | RemoveAllBrowsingHistory
  | RefetchBrowsingHistory
  | ToggleBrowsingHistoryRemovable
  | SaveBrowsingHistory;

export function addBrowsingHistory(
  payload: AddBrowsingHistoryPayload
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
  payload: AddBrowsingHistoryPayload
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
