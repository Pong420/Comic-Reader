import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import comics from './comics';
import comicData from './comicData';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    comics,
    comicData
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
