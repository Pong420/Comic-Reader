import { combineReducers } from 'redux';
import { comicsReducer } from './comics';

const rootReducer = () =>
  combineReducers({
    comics: comicsReducer
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
