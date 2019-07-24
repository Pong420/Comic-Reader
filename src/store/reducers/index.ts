import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import comics from './comics';
import comicData from './comicData';
import content from './content';
import browsingHistory from './browsingHistory';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    comics,
    comicData,
    content,
    browsingHistory
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
