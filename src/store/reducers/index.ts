import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './home';
import comic from './comic';
import content from './content';

export * from './home';
export * from './comic';
export * from './content';

const rootReducer = (history: Parameters<typeof connectRouter>[0]) =>
  combineReducers({
    router: connectRouter(history),
    home,
    comic,
    content
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
