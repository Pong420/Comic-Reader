import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { comicsReducer } from './comics';
import { browsingHistoryReducer } from './browsingHistory';
import { searchResultsReducer } from './searchResults';

const rootReducer = (history: Parameters<typeof connectRouter>[0]) =>
  combineReducers({
    router: connectRouter(history),
    comics: comicsReducer,
    browsingHistory: browsingHistoryReducer,
    searchResults: searchResultsReducer
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
