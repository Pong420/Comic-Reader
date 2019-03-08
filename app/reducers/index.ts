import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import comicList, { ComicListState } from './comicList';
import searchResult, { SearchResultState } from './searchResult';
// import bookmark, { BookmarkState } from './bookmark';
// import browsingHistory, { BrowsingHistoryState } from './browsingHistory';
import content, { ContentState } from './content';

export interface RootState {
  comicList: ComicListState;
  searchResult: SearchResultState;
  // bookmark: BookmarkState;
  // browsingHistory: BrowsingHistoryState;
  content: ContentState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    comicList,
    searchResult,
    // bookmark,
    // browsingHistory,
    content
  });
}
