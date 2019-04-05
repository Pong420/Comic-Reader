import { combineReducers } from 'redux';
import home from './home';
import comic from './comic';
import search from './search';
import bookmark from './bookmark';
import browsingHistory from './browsingHistory';

// import content from './content';
// import images from './images';

export * from './home';
export * from './comic';
export * from './search';
export * from './bookmark';
export * from './browsingHistory';
// export * from './content';
// export * from './images';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  home,
  comic,
  search,
  bookmark,
  browsingHistory
  // content,
  // images,
});

export default rootReducer;
