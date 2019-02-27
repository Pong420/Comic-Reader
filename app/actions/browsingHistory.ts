import { BrowsingHistoryItem } from '../../typing';
import { getComicDataAPI } from '../apis';

export enum BrowsingHistoryKeys {
  SET_BROWSING_HISTORY = 'SET_BROWSING_HISTORY',
  ADD_BROWSING_HISTORY = 'ADD_BROWSING_HISTORY',
  REMOVE_BROWSING_HISTORY = 'REMOVE_BROWSING_HISTORY',
  SAVE_BROWSING_HISTORY = 'SAVE_BROWSING_HISTORY'
}

export interface BrowsingHistoryPayload {
  comicID: string;
  chapterIDs?: string[];
  comicData?: BrowsingHistoryItem;
}

interface SetBrowsingHistoryAction {
  type: BrowsingHistoryKeys.SET_BROWSING_HISTORY;
  payload: BrowsingHistoryPayload;
}

interface AddBrowsingHistoryAction {
  type: BrowsingHistoryKeys.ADD_BROWSING_HISTORY;
  payload: BrowsingHistoryPayload;
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
  setBrowsingHistory: (
    ...args: ArgumentTypes<typeof setBrowsingHistory>
  ) => void;
  addBrowsingHistory: (
    ...args: ArgumentTypes<typeof addBrowsingHistory>
  ) => void;
  removeBrowsingHistory: (
    ...args: ArgumentTypes<typeof removeBrowsingHistory>
  ) => void;
  saveBrowsingHistory: () => void;
};

export function setBrowsingHistory(payload: BrowsingHistoryPayload) {
  return dispatch => {
    dispatch({
      type: BrowsingHistoryKeys.SET_BROWSING_HISTORY,
      payload
    });

    dispatch(saveBrowsingHistory());
  };
}

function addBrowsingHistory_(payload: BrowsingHistoryPayload) {
  return {
    type: BrowsingHistoryKeys.ADD_BROWSING_HISTORY,
    payload
  };
}

export function addBrowsingHistory(comicID: string, chapterID?: string) {
  return dispatch => {
    dispatch(addBrowsingHistory_({ comicID }));
    dispatch(saveBrowsingHistory());

    getComicDataAPI({
      comicID
    }).then(data => {
      const { comicID, name, cover, latest, updateTime } = data;
      dispatch(
        addBrowsingHistory_({
          comicID,
          chapterIDs: [chapterID],
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
