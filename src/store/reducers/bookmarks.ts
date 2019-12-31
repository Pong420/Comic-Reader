import { createCRUDReducer } from '@pong420/redux-crud';
import { LocationChangeAction, LOCATION_CHANGE } from 'connected-react-router';
import { BookmarkActionTypes, BookmarkActions } from '../actions/bookmarks';
import {
  SelectionState,
  selectionInitialState,
  selectionReducer
} from '../selection';

const [crudinitialState, crudReducer] = createCRUDReducer<
  Schema$Bookmark,
  'comicID'
>({
  key: 'comicID',
  actions: BookmarkActionTypes,
  onLocationChanged: null,
  pageSize: 1000000000000,
  ...window.bookmarkStorage.get()
});

type CRUDState = Parameters<typeof crudReducer>[0];
type State = CRUDState & SelectionState;

const initialState: State = {
  ...crudinitialState,
  ...selectionInitialState
};

export const bookmarkReducer = (
  state = initialState,
  action: BookmarkActions | LocationChangeAction
): State => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        ...selectionInitialState
      };

    case BookmarkActionTypes.SET_SELECTION_BOOKMARK:
    case BookmarkActionTypes.TOGGLE_SELECTABLE_BOOKMARK:
    case BookmarkActionTypes.TOGGLE_SELECTION_BOOKMARK:
      return {
        ...state,
        ...selectionReducer(state, action)
      };

    case BookmarkActionTypes.TOGGLE_SELECT_ALL_BOOKMARK:
      return {
        ...state,
        ...selectionReducer(state, {
          ...action,
          payload: state.ids as string[]
        })
      };

    case BookmarkActionTypes.CREATE:
    case BookmarkActionTypes.DELETE:
    case BookmarkActionTypes.UPDATE:
      const newState = { ...state, ...crudReducer(state, action) };

      window.bookmarkStorage.save({
        ids: newState.ids as string[],
        byIds: newState.byIds
      });

      return newState;

    default:
      return state;
  }
};
