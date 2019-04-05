import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes
} from '../actions/browsingHistory';
import { writeFileSync } from '../../utils/writeFileSync';
import { BrowsingHistoryItem } from '../../typings';

export const browsingHistoryDirectory = path.join(
  remote.app.getPath('userData'),
  'comic-reader',
  'browsingHistory.json'
);

interface BrowsingHistoryMapVal {
  comicID: string;
  chapterIDs: string[];
  browsingHistoryItem: BrowsingHistoryItem;
}

type BrowsingHistoryMap = Array<[string, BrowsingHistoryMapVal]>;

export interface BrowsingHistoryState {
  browsingHistory: BrowsingHistoryMap;
  removable: boolean;
}

const initialBrowsingHistory = (fs.existsSync(browsingHistoryDirectory)
  ? JSON.parse(fs.readFileSync(browsingHistoryDirectory, 'utf8'))
  : []) as BrowsingHistoryMap;

const initialState: BrowsingHistoryState = {
  browsingHistory: initialBrowsingHistory,
  removable: false
};

export default function(state = initialState, action: BrowsingHistoryActions) {
  const mappedBrowsingHistorys = new Map(state.browsingHistory.slice(0));

  switch (action.type) {
    case BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS:
      mappedBrowsingHistorys.delete(action.payload.comicID);

    case BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS:
      const { gridData, comicID, chapterID } = action.payload;

      return {
        ...state,
        browsingHistory: [
          ...mappedBrowsingHistorys.set(gridData.comicID, {
            chapterIDs: [chapterID],
            browsingHistoryItem: gridData,
            comicID
          })
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

    case BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE:
      return {
        ...state,
        removable:
          typeof action.payload !== 'undefined'
            ? action.payload
            : !state.removable
      };

    case BrowsingHistoryActionTypes.SAVE_BROWSING_HISTORY:
      writeFileSync(browsingHistoryDirectory, state.browsingHistory);

      return state;

    default:
      return state;
  }
}
