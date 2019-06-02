import { combineReducers } from 'redux';
import home from './home';
import comic from './comic';

export * from './home';
export * from './comic';

const rootReducer = combineReducers({
  home,
  comic
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
