import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import { BrowsingHistoryItem } from '../../typing';
import {
  BrowsingHistoryKeys,
  BrowsingHistoryTypes
} from '../actions/browsingHistory';
import { writeFileSync } from '../utils/writeFileSync';

const storeDirectory = path.join(
  remote.app.getPath('userData'),
  'comic-reader',
  'browsingHistory.json'
);

interface HistroyItem {
  comicData?: BrowsingHistoryItem;
  chapterIDs?: string[];
  comicID: string;
}

export interface BrowsingHistoryState {
  browsingHistory: [string, HistroyItem][];
}

const initialBrowsingHistory = (fs.existsSync(storeDirectory)
  ? JSON.parse(fs.readFileSync(storeDirectory, 'utf8'))
  : []) as [string, HistroyItem][];

const initialState: BrowsingHistoryState = {
  browsingHistory: initialBrowsingHistory
};

export default function(state = initialState, action: BrowsingHistoryTypes) {
  const mappedBrowsingHistorys = new Map(state.browsingHistory.slice(0));

  switch (action.type) {
    case BrowsingHistoryKeys.SAVE_BROWSING_HISTORY:
      writeFileSync(storeDirectory, state.browsingHistory);

      return state;
    case BrowsingHistoryKeys.SET_BROWSING_HISTORY:
      mappedBrowsingHistorys.set(action.payload.comicID, action.payload);

      return {
        ...state,
        browsingHistory: [
          ...mappedBrowsingHistorys.set(action.payload.comicID, action.payload)
        ]
      };
    case BrowsingHistoryKeys.ADD_BROWSING_HISTORY:
      mappedBrowsingHistorys.delete(action.payload.comicID);

      return {
        ...state,
        browsingHistory: [
          ...mappedBrowsingHistorys.set(action.payload.comicID, action.payload)
        ]
      };
    case BrowsingHistoryKeys.REMOVE_BROWSING_HISTORY:
      mappedBrowsingHistorys.delete(action.payload.comicID);

      return {
        ...state,
        browsingHistory: [...mappedBrowsingHistorys]
      };
    default:
      return state;
  }
}
