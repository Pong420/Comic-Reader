import { createCRUDReducer } from '@pong420/redux-crud';
import { BrowsingHistoryActionTypes } from '../actions/browsingHistory';

const [initialState, reducer] = createCRUDReducer<
  Schema$BrowsingHistory,
  'comicID'
>({
  key: 'comicID',
  actions: BrowsingHistoryActionTypes,
  onLocationChanged: null,
  pageSize: 1000000000000,
  ...window.browsingHistoryStorage.get()
});

export const browsingHistoryReducer: typeof reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BrowsingHistoryActionTypes.CREATE:
    case BrowsingHistoryActionTypes.DELETE:
    case BrowsingHistoryActionTypes.UPDATE:
      const newState = reducer(state, action);
      window.browsingHistoryStorage.save({
        ids: newState.ids as string[],
        byIds: newState.byIds
      });
      return newState;

    default:
      return state;
  }
};
