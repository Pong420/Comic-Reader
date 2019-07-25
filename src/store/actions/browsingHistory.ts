import { Schema$GridData, Schema$BrowsingHistory } from '../../typings';
import { Omit } from 'react-redux';

export enum BrowsingHistoryActionTypes {
  ADD_BROWSING_HISTORY_SUCCESS = 'ADD_BROWSING_HISTORY_SUCCESS',
  ADD_BROWSING_HISTORY_FAILURE = 'ADD_BROWSING_HISTORY_FAILURE',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  UPDATE_BROWSING_HISTORY = 'UPDATE_BROWSING_HISTORY',
  UPDATE_BROWSING_HISTORY_SELECTION = 'UPDATE_BROWSING_HISTORY_SELECTION',
  TOGGLE_BROWSING_HISTORY_SELECT_ALL = 'TOGGLE_BROWSING_HISTORY_SELECT_ALL',
  TOGGLE_BROWSING_HISTORY_SELECTABLE = 'TOGGLE_BROWSING_HISTORY_SELECTABLE'
}

export interface AddBrowsingHistorySuccess {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS;
  payload: Schema$GridData;
}

export interface AddBrowsingHistoryFailure {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_FAILURE;
  payload: string;
}

export interface RemoveBrowsingHistory {
  type: BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY;
  payload?: string | string[];
}

export interface UpdateBrowsingHistory {
  type: BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY;
  payload: Omit<Schema$BrowsingHistory, 'chapterID'>;
}

export interface UpdateBrowsingHistorySelection {
  type: BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY_SELECTION;
  payload: string;
}

export interface ToggleBrowsingHistorySelectAll {
  type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECT_ALL;
  payload?: boolean;
}

export interface ToggleBrowsingHistorySelectable {
  type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECTABLE;
  payload?: boolean;
}

export type BrowsingHistoryActions =
  | AddBrowsingHistorySuccess
  | AddBrowsingHistoryFailure
  | RemoveBrowsingHistory
  | UpdateBrowsingHistory
  | UpdateBrowsingHistorySelection
  | ToggleBrowsingHistorySelectable
  | ToggleBrowsingHistorySelectAll;

export function removeBrowsingHistory(
  payload?: RemoveBrowsingHistory['payload']
): RemoveBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
    payload
  };
}

export function updateBrowsingHistory(
  payload: UpdateBrowsingHistory['payload']
): UpdateBrowsingHistory {
  return {
    type: BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY,
    payload
  };
}

export function updateBrowsingHistorySelection(
  payload: UpdateBrowsingHistorySelection['payload']
): UpdateBrowsingHistorySelection {
  return {
    type: BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY_SELECTION,
    payload
  };
}

export function toggleBrowsingHistorySelectable(
  payload?: ToggleBrowsingHistorySelectable['payload']
): ToggleBrowsingHistorySelectable {
  return {
    type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECTABLE,
    payload
  };
}

export function toggleBrowsingHistorySelectAll(
  payload?: ToggleBrowsingHistorySelectAll['payload']
): ToggleBrowsingHistorySelectAll {
  return {
    type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECT_ALL,
    payload
  };
}

export const BrowsingHistoryActionCreators = {
  removeBrowsingHistory,
  updateBrowsingHistory,
  updateBrowsingHistorySelection,
  toggleBrowsingHistorySelectable,
  toggleBrowsingHistorySelectAll
};
