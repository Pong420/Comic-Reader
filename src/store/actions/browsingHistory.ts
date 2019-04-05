import { GridData } from '../../typings';

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

export interface AddBrowsingHistory {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY;
  payload: BrowsingHistoryPayload;
}

export interface AddBrowsingHistorySuccess {
  type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS;
  payload: BrowsingHistorySuccessPayload;
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
  payload: BrowsingHistoryPayload;
}

export interface RefetchBrowsingHistorySuccess {
  type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS;
  payload: BrowsingHistorySuccessPayload;
}

export interface ToggleBrowsingHistoryRemovable {
  type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE;
  payload?: boolean;
}

export interface SaveBrowsingHistory {
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

export const BrowsingHistoryActionCreators = {
  addBrowsingHistory(payload: BrowsingHistoryPayload): AddBrowsingHistory {
    return {
      type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY,
      payload
    };
  },
  removeBrowsingHistory(comicID: string): RemoveBrowsingHistory {
    return {
      type: BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
      payload: comicID
    };
  },
  removeAllBrowsingHistory(): RemoveAllBrowsingHistory {
    return {
      type: BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY
    };
  },
  refetchBrowsingHistory(payload: BrowsingHistoryPayload): RefetchBrowsingHistory {
    return {
      type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY,
      payload
    };
  },
  toggleBrowsingHistoryRemovable(payload?: boolean): ToggleBrowsingHistoryRemovable {
    return {
      type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE,
      payload
    };
  }
};
