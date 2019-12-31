import { createCRUDReducer } from '@pong420/redux-crud';
import { BookmarkActionTypes } from '../actions/bookmarks';

const [initialState, reducer] = createCRUDReducer<Schema$Bookmark, 'comicID'>({
  key: 'comicID',
  actions: BookmarkActionTypes,
  onLocationChanged: null,
  pageSize: 1000000000000,
  ...window.bookmarkStorage.get()
});

export const bookmarkReducer: typeof reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BookmarkActionTypes.CREATE:
    case BookmarkActionTypes.DELETE:
    case BookmarkActionTypes.UPDATE:
      const newState = reducer(state, action);

      window.bookmarkStorage.save({
        ids: newState.ids as string[],
        byIds: newState.byIds
      });

      return newState;

    default:
      return state;
  }
};
