import { BrowsingHistoryItem, BrowsingHistory } from '../../typing';
import { getComicDataAPI } from '../apis';

export enum BrowsingHistoryKeys {
  SET_BROWSING_HISTORY = 'SET_BROWSING_HISTORY',
  ADD_BROWSING_HISTORY = 'ADD_BROWSING_HISTORY',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  SAVE_BROWSING_HISTORY = 'SAVE_BROWSING_HISTORY'
}

export interface AddBookMarkPayload {
  bookmark: BrowsingHistoryItem;
}

interface SetBrowsingHistoryAction {
  type: BrowsingHistoryKeys.SET_BROWSING_HISTORY;
  payload: {
    browsingHistory: BrowsingHistory;
  };
}

interface AddBrowsingHistoryAction {
  type: BrowsingHistoryKeys.ADD_BROWSING_HISTORY;
  payload: {
    comicID: string;
    browsingHistoryItem: BrowsingHistoryItem;
  };
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

export type BrowsingHistoryTypes =
  | SetBrowsingHistoryAction
  | AddBrowsingHistoryAction
  | SaveBrowsingHistoryAction
  | RemoveBrowsingHistoryAction;

export type BrowsingHistoryActions = {
  setBrowsingHistory: (browsingHistory: BrowsingHistory) => void;
  addBrowsingHistory: (comicID: string) => void;
  removeBrowsingHistory: (comicID: string) => void;
  saveBrowsingHistory: () => void;
};

export function setBrowsingHistory(browsingHistory: BrowsingHistory) {
  return dispatch => {
    dispatch({
      type: BrowsingHistoryKeys.SET_BROWSING_HISTORY,
      payload: {
        browsingHistory
      }
    });

    dispatch(saveBrowsingHistory());
  };
}

function addBrowsingHistory_(
  comicID: string,
  browsingHistoryItem: BrowsingHistoryItem
) {
  return {
    type: BrowsingHistoryKeys.ADD_BROWSING_HISTORY,
    payload: {
      comicID,
      browsingHistoryItem
    }
  };
}

export function addBrowsingHistory(comicID: string) {
  return dispatch => {
    dispatch(addBrowsingHistory_(comicID, null));
    dispatch(saveBrowsingHistory());

    getComicDataAPI({
      comicID
    }).then(data => {
      const { comicID, name, cover, latest, updateTime } = data;
      dispatch(
        addBrowsingHistory_(comicID, {
          comicID,
          name,
          cover,
          latest,
          updateTime
        })
      );
      dispatch(saveBrowsingHistory());
    });
  };
}

export function removeBrowsingHistory(comicID: string) {
  return dispatch => {
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

export default {
  setBrowsingHistory,
  addBrowsingHistory,
  removeBrowsingHistory,
  saveBrowsingHistory
} as BrowsingHistoryActions;
