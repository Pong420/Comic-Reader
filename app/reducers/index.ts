import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import latestUpdate from './latestUpdate';
import searchResult from './searchResult';
import bookmark from './bookmark';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    latestUpdate,
    searchResult,
    bookmark
  });
}
