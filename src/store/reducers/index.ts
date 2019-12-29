import { combineReducers } from 'redux';
import { comicsReducer } from './comics';
import { browsingHistoryReducer } from './browsingHistory';

const rootReducer = () =>
  combineReducers({
    comics: comicsReducer,
    browsingHistory: browsingHistoryReducer
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
