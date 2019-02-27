import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import latestUpdate from './latestUpdate';
import searchResult from './searchResult';
import bookmark from './bookmark';
import browsingHistory from './browsingHistory';
import content from './content';

// FIXME:
export default function createRootReducer(history: History) {
  return combineReducers<any, any>({
    router: connectRouter(history),
    latestUpdate,
    searchResult,
    bookmark,
    browsingHistory,
    content
  });
}
