import { RouterAction, LOCATION_CHANGE } from 'connected-react-router';
import { BookmarkActionTypes, BookmarkActions } from '../actions/bookmark';
import {
  Schema$BookmarkStorage,
  bookmarkStorage
} from '../../storage/bookmark';
import { remove } from '../../utils/array';

export interface State extends Schema$BookmarkStorage {
  selectable: boolean;
  selection: string[];
}

const initialState: State = {
  ...bookmarkStorage.get(),
  selectable: false,
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
            : action.payload || state.selection;

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

    case BookmarkActionTypes.UPDATE_BOOKMARK:
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [action.payload.comicID]: action.payload
        }
      };

    case BookmarkActionTypes.UPDATE_BOOKMARK_SELECTION:
      return (() => {
        const comicID = action.payload;

        return {
          ...state,
          selection: state.selection.includes(comicID)
            ? remove(state.selection, comicID)
            : [...state.selection, comicID]
        };
      })();

    case BookmarkActionTypes.TOGGLE_BOOKMARK_SELECT_ALL:
      const selectAll =
        typeof action.payload !== 'undefined'
          ? !!action.payload
          : state.selection.length !== state.ids.length;

      return {
        ...state,
        selection: selectAll ? state.ids : []
      };

    case BookmarkActionTypes.TOGGLE_BOOKMARK_SELECTABLE:
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
