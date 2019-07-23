import { combineReducers } from 'redux';
import comics from './comics';

const rootReducer = () =>
  combineReducers({
    comics
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
