import { combineReducers } from 'redux';
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

// TODO:  typing

export interface RootState {
  router: RouterState;
  bookmark: typeof bookmark;
  browsingHistory: typeof browsingHistory;
  content: typeof content;
  comic: typeof comic;
  comicList: typeof comicList;
  images: typeof images;
  search: typeof search;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    bookmark,
    browsingHistory,
    comic,
    comicList,
    content,
    images,
    search
  });
}
