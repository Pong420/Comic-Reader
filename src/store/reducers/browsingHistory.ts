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
  seletable: boolean;
  selection: string[];
}

const getBrowsingHistory = (): BrowsingHistoryMap =>
  fs.existsSync(BROWSING_HISTORY_DIRECTORY)
    ? JSON.parse(fs.readFileSync(BROWSING_HISTORY_DIRECTORY, 'utf8'))
    : [];

const initialState: BrowsingHistoryState = {
  browsingHistory: getBrowsingHistory(),
  seletable: false,
  selection: []
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
      Array.from(action.payload).forEach(comicID =>
        mappedBrowsingHistory.delete(comicID)
      );

      return {
        ...state,
        browsingHistory: [...mappedBrowsingHistory]
      };

    case BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS:
      mappedBrowsingHistory.set(action.payload.comicID, {
        chapterID: mappedBrowsingHistory.get(action.payload.comicID)!.chapterID,
        ...action.payload
      });

      return {
        ...state,
        browsingHistory: [...mappedBrowsingHistory]
      };

    case BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY_SELECTION:
      return {
        ...state,
        selection: action.payload
      };

    case BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECTION:
      return {
        ...state,
        selection: [],
        seletable:
          typeof action.payload !== 'undefined'
            ? !!action.payload
            : !state.seletable
      };

    default:
      return state;
  }
}
