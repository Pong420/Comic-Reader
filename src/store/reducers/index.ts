import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './home';
import comic from './comic';
import content from './content';
import search from './search';
import browsingHistory from './browsingHistory';
import bookmark from './bookmark';

export * from './home';
export * from './comic';
export * from './content';
export * from './search';
export * from './browsingHistory';
export * from './bookmark';

const rootReducer = (history: Parameters<typeof connectRouter>[0]) =>
  combineReducers({
    router: connectRouter(history),
    home,
    comic,
    content,
    search,
    browsingHistory,
    bookmark
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
