import { RouterAction, LOCATION_CHANGE } from 'connected-react-router';
import {
  BrowsingHistoryActionTypes,
  BrowsingHistoryActions
} from '../actions/browsingHistory';
import { ContentActions, ContentActionTypes } from '../actions/content';
import {
  Schema$BrowsingHistoryStorage,
  browsingHistoryStorage
} from '../../storage/browsingHistory';
import { remove } from '../../utils/array';

export interface State extends Schema$BrowsingHistoryStorage {
  selectable: boolean;
  selection: string[];
}

const initialState: State = {
  ...browsingHistoryStorage.get(),
  selectable: false,
  selection: []
};

export default function(
  state = initialState,
  action: BrowsingHistoryActions | ContentActions | RouterAction
): State {
  switch (action.type) {
    case ContentActionTypes.GET_CONTENT:
      return (() => {
        const { comicID, chapterID } = action.payload;
        const ids = [action.payload.comicID, ...remove(state.ids, comicID)];
        return {
          ...state,
          ids,
          byIds: {
            ...state.byIds,
            [comicID]: {
              comicID,
              chapterID
            }
          }
        };
      })();

    case BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS:
      return (() => {
        const { comicID } = action.payload;
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [comicID]: {
              ...state.byIds[comicID],
              ...action.payload
            }
          }
        };
      })();

    case BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY:
      return (() => {
        const comicIDs =
          typeof action.payload === 'string'
            ? [action.payload]
            : action.payload;

        let ids = state.ids.slice();
        const byIds = { ...state.byIds };

        comicIDs.forEach(id => {
          delete byIds[id];
          ids = remove(ids, id);
        });

        return {
          ...state,
          byIds,
          ids
        };
      })();

    case BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY_SELECTION:
      return {
        ...state,
        selection: action.payload
      };

    case BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_SELECTION:
      return {
        ...state,
        selection: [],
        selectable:
          typeof action.payload !== 'undefined'
            ? !!action.payload
            : !state.selectable
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        selection: [],
        selectable: false
      };

    default:
      return state;
  }
}
