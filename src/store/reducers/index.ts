import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './home';
import comic from './comic';
import content from './content';
import search from './search';

export * from './home';
export * from './comic';
export * from './content';
export * from './search';

const rootReducer = (history: Parameters<typeof connectRouter>[0]) =>
  combineReducers({
    router: connectRouter(history),
    home,
    comic,
    content,
    search
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
