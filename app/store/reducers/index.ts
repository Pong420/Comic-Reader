import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import comicList from './comicList';
import search from './search';

export * from './comicList';
export * from './search';

export interface RootState {
  router: RouterState;
  comicList: typeof comicList;
  search: typeof search;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    comicList,
    search
  });
}
