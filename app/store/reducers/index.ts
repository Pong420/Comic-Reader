import { combineReducers, ReducersMapObject } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import bookmark from './bookmark';
import browsingHistory from './browsingHistory';
import comic from './comic';
import comicList from './comicList';
import content from './content';
import images from './images';
import search from './search';

export * from './bookmark';
export * from './browsingHistory';
export * from './comic';
export * from './comicList';
export * from './content';
export * from './images';
export * from './search';

type ExtractRootState<T extends ReducersMapObject> = {
  [P in keyof T]: ReturnType<T[P]>
};

export type RootState = ExtractRootState<typeof rootState> & {
  router: RouterState;
};

const rootState = {
  bookmark,
  browsingHistory,
  comic,
  comicList,
  content,
  images,
  search
};

export default function createRootReducer(history: History) {
  return combineReducers<RootState>({
    router: connectRouter(history),
    ...rootState
  });
}
