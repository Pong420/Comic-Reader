import { RouterAction, LOCATION_CHANGE } from 'connected-react-router';
import { BookmarkActionTypes, BookmarkActions } from '../actions/bookmark';
import {
  Schema$BookmarkStorage,
  bookmarkStorage
} from '../../storage/bookmark';
import { remove } from '../../utils/array';

export interface State extends Schema$BookmarkStorage {
  seletable: boolean;
  selection: string[];
}

const initialState: State = {
  ...bookmarkStorage.get(),
  seletable: false,
  selection: []
};

export default function(
  state = initialState,
  action: BookmarkActions | RouterAction
): State {
  switch (action.type) {
    case BookmarkActionTypes.ADD_BOOKMARK:
      return (() => {
        const comicID = action.payload;
        return {
          ...state,
          ids: [comicID, ...remove(state.ids, comicID)],
          byIds: {
            ...state.byIds,
            [comicID]: { comicID }
          }
        };
      })();

    case BookmarkActionTypes.ADD_BOOKMARK_SUCCESS:
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

    case BookmarkActionTypes.REMOVE_BOOKMARK:
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

    case BookmarkActionTypes.UPDATE_BOOKMARK_SELECTION:
      return {
        ...state,
        selection: action.payload
      };

    case BookmarkActionTypes.TOGGLE_BOOKMARK_SELECTION:
      return {
        ...state,
        selection: [],
        seletable:
          typeof action.payload !== 'undefined'
            ? !!action.payload
            : !state.seletable
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        selection: [],
        seletable: false
      };

    default:
      return state;
  }
}
