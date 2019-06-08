import fs from 'fs';
import {
  BrowsingHistoryActionTypes,
  BrowsingHistoryActions
} from '../actions/browsingHistory';
import { ContentActions, ContentActionTypes } from '../actions/content';
import { Schema$BrowsingHistory } from '../../typings';
import { BROWSING_HISTORY_DIRECTORY } from '../../constants';

type BrowsingHistoryMap = Schema$BrowsingHistory[];

export interface BrowsingHistoryState {
  browsingHistory: BrowsingHistoryMap;
  removable: boolean;
}

const getBrowsingHistory = (): BrowsingHistoryMap =>
  fs.existsSync(BROWSING_HISTORY_DIRECTORY)
    ? JSON.parse(fs.readFileSync(BROWSING_HISTORY_DIRECTORY, 'utf8'))
    : [];

const initialState: BrowsingHistoryState = {
  browsingHistory: getBrowsingHistory(),
  removable: false
};

export default function(
  state = initialState,
  action: BrowsingHistoryActions | ContentActions
) {
  const mappedBrowsingHistory = new Map(state.browsingHistory.slice(0));

  switch (action.type) {
    case ContentActionTypes.GET_CONTENT:
      mappedBrowsingHistory.delete(action.payload.comicID);
      mappedBrowsingHistory.set(action.payload.comicID, action.payload);

    // eslint-disable-next-line
    case BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS:
      return (() => {
        const { comicID } = action.payload;
        mappedBrowsingHistory.set(comicID, {
          ...mappedBrowsingHistory.get(comicID)!,
          ...action.payload
        });

        return {
          ...state,
          browsingHistory: [...mappedBrowsingHistory].slice(0, 50)
        };
      })();

    case BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY:
      mappedBrowsingHistory.delete(action.payload);

      return {
        ...state,
        browsingHistory: [...mappedBrowsingHistory]
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

    default:
      return state;
  }
}
