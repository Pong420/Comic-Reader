import { combineReducers } from 'redux';
import comics from './comics';
import comicData from './comicData';

const rootReducer = () =>
  combineReducers({
    comics,
    comicData
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
