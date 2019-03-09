import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import bookmark from './bookmark';
import browsingHistory from './browsingHistory';
import content from './content';
import comicList from './comicList';
import images from './images';
import search from './search';

export * from './bookmark';
export * from './browsingHistory';
export * from './content';
export * from './comicList';
export * from './images';
export * from './search';

// TODO:  typing

export interface RootState {
  router: RouterState;
  bookmark: typeof bookmark;
  browsingHistory: typeof browsingHistory;
  content: typeof content;
  comicList: typeof comicList;
  images: typeof images;
  search: typeof search;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    bookmark,
    browsingHistory,
    content,
    comicList,
    images,
    search
  });
}
