import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import bookmark from './bookmark';
import browsingHistory from './browsingHistory';
import comicList from './comicList';
import search from './search';

export * from './browsingHistory';
export * from './comicList';
export * from './search';
export * from './bookmark';

// TODO:  typing

export interface RootState {
  router: RouterState;
  bookmark: typeof bookmark;
  browsingHistory: typeof browsingHistory;
  comicList: typeof comicList;
  search: typeof search;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    bookmark,
    browsingHistory,
    comicList,
    search
  });
}
