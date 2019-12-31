import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { comicsReducer } from './comics';
import { searchResultsReducer } from './searchResults';
import { browsingHistoryReducer } from './browsingHistory';
import { bookmarkReducer } from './bookmarks';

const rootReducer = (history: Parameters<typeof connectRouter>[0]) =>
  combineReducers({
    router: connectRouter(history),
    comics: comicsReducer,
    searchResults: searchResultsReducer,
    browsingHistory: browsingHistoryReducer,
    bookmarks: bookmarkReducer
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
