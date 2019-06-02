import { combineReducers } from 'redux';
import home from './home';

export * from './home';

const rootReducer = combineReducers({
  home
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
