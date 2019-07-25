import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import comics from './comics';
import comicData from './comicData';
import content from './content';
import browsingHistory from './browsingHistory';
import bookmark from './bookmark';
import searchResults from './searchResults';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    comics,
    comicData,
    content,
    browsingHistory,
    bookmark,
    searchResults
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
