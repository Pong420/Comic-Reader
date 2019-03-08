import { Dispatch } from 'redux';
import { BrowsingHistoryItem } from '../../typing';
import { getComicDataAPI } from '../apis';

export enum BrowsingHistoryKeys {
  SET_BROWSING_HISTORY = 'SET_BROWSING_HISTORY',
  ADD_BROWSING_HISTORY = 'ADD_BROWSING_HISTORY',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  SAVE_BROWSING_HISTORY = 'SAVE_BROWSING_HISTORY',
  REMOVE_ALL_BROWSING_HISTORY = 'REMOVE_ALL_BROWSING_HISTORY',
  TOGGLE_REMOVABLE = 'TOGGLE_BROWSING_HISTORY_REMOVABLE'
}

export interface AddBrowsingHistoryPayload {
  comicID: string;
  chapterIDs: string[];
  comicData?: BrowsingHistoryItem;
}

interface SetBrowsingHistoryAction {
  type: BrowsingHistoryKeys.SET_BROWSING_HISTORY;
  payload: AddBrowsingHistoryPayload;
}

interface AddBrowsingHistoryAction {
  type: BrowsingHistoryKeys.ADD_BROWSING_HISTORY;
  payload: AddBrowsingHistoryPayload;
}

interface RemoveBrowsingHistoryAction {
  type: BrowsingHistoryKeys.REMOVE_BROWSING_HISTORY;
  payload: {
    comicID: string;
  };
}

interface SaveBrowsingHistoryAction {
  type: BrowsingHistoryKeys.SAVE_BROWSING_HISTORY;
}

interface ToggleRemovableAction {
  type: BrowsingHistoryKeys.TOGGLE_REMOVABLE;
  payload: {
    removable: boolean;
  };
}

interface RemoveAllBrowsingHistoryAction {
  type: BrowsingHistoryKeys.REMOVE_ALL_BROWSING_HISTORY;
}

export type BrowsingHistoryTypes =
  | SetBrowsingHistoryAction
  | AddBrowsingHistoryAction
  | SaveBrowsingHistoryAction
  | RemoveBrowsingHistoryAction
  | ToggleRemovableAction
  | RemoveAllBrowsingHistoryAction;

export type BrowsingHistoryActions = {
  setBrowsingHistory: typeof setBrowsingHistory;
  addBrowsingHistory: typeof addBrowsingHistory;
  removeBrowsingHistory: typeof removeBrowsingHistory;
  saveBrowsingHistory: typeof saveBrowsingHistory;
  toogleRemovable: typeof toogleRemovable;
  removeAllBrowsingHistory: typeof removeAllBrowsingHistory;
};

export function setBrowsingHistory(payload: AddBrowsingHistoryPayload) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: BrowsingHistoryKeys.SET_BROWSING_HISTORY,
      payload
    });

    dispatch(saveBrowsingHistory());
  };
}

function addBrowsingHistory_(payload: AddBrowsingHistoryPayload) {
  return {
    type: BrowsingHistoryKeys.ADD_BROWSING_HISTORY,
    payload
  };
}

export function addBrowsingHistory(comicID: string, chapterID?: string) {
  return (dispatch: Dispatch) => {
    dispatch(addBrowsingHistory_({ comicID, chapterIDs: [] }));
    dispatch(saveBrowsingHistory());

    getComicDataAPI({
      comicID
    }).then(data => {
      const { comicID, name, cover, latest, updateTime } = data;
      dispatch(
        addBrowsingHistory_({
          comicID,
          chapterIDs: chapterID ? [chapterID] : [],
          comicData: {
            comicID,
            name,
            cover,
            latest,
            updateTime
          }
        })
      );
      dispatch(saveBrowsingHistory());
    });
  };
}

export function removeBrowsingHistory(comicID: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: BrowsingHistoryKeys.REMOVE_BROWSING_HISTORY,
      payload: {
        comicID
      }
    });

    dispatch(saveBrowsingHistory());
  };
}

export function saveBrowsingHistory() {
  return {
    type: BrowsingHistoryKeys.SAVE_BROWSING_HISTORY
  };
}

export function toogleRemovable(removable: boolean) {
  return {
    type: BrowsingHistoryKeys.TOGGLE_REMOVABLE,
    payload: {
      removable
    }
  };
}

export function removeAllBrowsingHistory() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: BrowsingHistoryKeys.REMOVE_ALL_BROWSING_HISTORY
    });

    dispatch(saveBrowsingHistory());
  };
}

export default {
  setBrowsingHistory,
  addBrowsingHistory,
  removeBrowsingHistory,
  saveBrowsingHistory,
  toogleRemovable,
  removeAllBrowsingHistory
};
