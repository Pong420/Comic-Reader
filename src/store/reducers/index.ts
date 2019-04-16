import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './home';
import comic from './comic';
import content from './content';
import images from './images';
import search from './search';
import bookmark from './bookmark';
import browsingHistory from './browsingHistory';

export * from './home';
export * from './comic';
export * from './search';
export * from './bookmark';
export * from './browsingHistory';
export * from './content';
export * from './images';

const rootReducer = (history: Parameters<typeof connectRouter>[0]) =>
  combineReducers({
    router: connectRouter(history),
    home,
    comic,
    content,
    images,
    search,
    bookmark,
    browsingHistory
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
