import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import comicList, { ComicListState } from './comicList';

export * from './comicList';

export interface RootState {
  router: RouterState;
  comicList: ComicListState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    comicList
  });
}
