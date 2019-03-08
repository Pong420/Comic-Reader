import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes,
  AddBrowsingHistoryPayload
} from '../actions/browsingHistory';
import { writeFileSync } from '../../utils/writeFileSync';

export const browingHistoryDirectory = path.join(
  remote.app.getPath('userData'),
  'comic-reader',
  'browsingHistory.json'
);

type BrowsingHistory = [string, AddBrowsingHistoryPayload][];

export interface BrowsingHistoryState {
  browsingHistory: BrowsingHistory;
  removable: boolean;
}

const initialBrowsingHistory = (fs.existsSync(browingHistoryDirectory)
  ? JSON.parse(fs.readFileSync(browingHistoryDirectory, 'utf8'))
  : []) as BrowsingHistory;

const initialState: BrowsingHistoryState = {
  browsingHistory: initialBrowsingHistory,
  removable: false
};

export default function(state = initialState, action: BrowsingHistoryActions) {
  const mappedBrowsingHistorys = new Map(state.browsingHistory.slice(0));

  switch (action.type) {
    case BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY:
      mappedBrowsingHistorys.delete(action.payload.comicID);

      return {
        ...state,
        browsingHistory: [
          ...mappedBrowsingHistorys.set(action.payload.comicID, action.payload)
        ]
      };

    case BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY:
      mappedBrowsingHistorys.delete(action.payload);

      return {
        ...state,
        browsingHistory: [...mappedBrowsingHistorys]
      };

    case BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY:
      return {
        ...state,
        browsingHistory: []
      };

    case BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY:
      mappedBrowsingHistorys.set(action.payload.comicID, action.payload);

      return {
        ...state,
        browsingHistory: [
          ...mappedBrowsingHistorys.set(action.payload.comicID, action.payload)
        ]
      };

    case BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE:
      return {
        ...state,
        removable: action.payload
      };

    case BrowsingHistoryActionTypes.SAVE_BROWSING_HISTORY:
      writeFileSync(browingHistoryDirectory, state.browsingHistory);

      return state;

    default:
      return state;
  }
}
