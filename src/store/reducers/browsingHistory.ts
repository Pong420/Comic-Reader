import { createCRUDReducer } from '@pong420/redux-crud';
import { LocationChangeAction, LOCATION_CHANGE } from 'connected-react-router';
import {
  BrowsingHistoryActionTypes,
  BrowsingHistoryActions
} from '../actions/browsingHistory';
import {
  SelectionState,
  selectionInitialState,
  selectionReducer
} from '../selection';

const [crudinitialState, crudReducer] = createCRUDReducer<
  Schema$BrowsingHistory,
  'comicID'
>({
  key: 'comicID',
  actions: BrowsingHistoryActionTypes,
  onLocationChanged: null,
  pageSize: 1000000000000,
  ...window.browsingHistoryStorage.get()
});

type CRUDState = Parameters<typeof crudReducer>[0];
type State = CRUDState & SelectionState;

const initialState: State = {
  ...crudinitialState,
  ...selectionInitialState
};

export const browsingHistoryReducer = (
  state = initialState,
  action: BrowsingHistoryActions | LocationChangeAction
): State => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, ...selectionInitialState };

    case BrowsingHistoryActionTypes.SET_SELECTION_BROWSING_HISTORY:
    case BrowsingHistoryActionTypes.TOGGLE_SELECTABLE_BROWSING_HISTORY:
    case BrowsingHistoryActionTypes.TOGGLE_SELECTION_BROWSING_HISTORY:
      return {
        ...state,
        ...selectionReducer(state, action)
      };

    case BrowsingHistoryActionTypes.TOGGLE_SELECT_ALL_BROWSING_HISTORY:
      return {
        ...state,
        ...selectionReducer(state, {
          ...action,
          payload: state.ids as string[]
        })
      };

    case BrowsingHistoryActionTypes.CREATE:
    case BrowsingHistoryActionTypes.DELETE:
    case BrowsingHistoryActionTypes.UPDATE:
      const newState = { ...state, ...crudReducer(state, action) };
      window.browsingHistoryStorage.save({
        ids: newState.ids as string[],
        byIds: newState.byIds
      });
      return newState;

    default:
      return state;
  }
};
