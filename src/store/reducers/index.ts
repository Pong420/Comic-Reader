import { combineReducers } from 'redux';
import home from './home';
import comic from './comic';
import content from './content';

export * from './home';
export * from './comic';
export * from './content';

const rootReducer = combineReducers({
  home,
  comic,
  content
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
