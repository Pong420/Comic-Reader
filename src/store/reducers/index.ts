import { combineReducers } from 'redux';
import home from './home';
import comic from './comic';

// import bookmark from './bookmark';
// import browsingHistory from './browsingHistory';
// import content from './content';
// import images from './images';
import search from './search';

export * from './home';
export * from './comic';
// export * from './bookmark';
// export * from './browsingHistory';
// export * from './content';
// export * from './images';
export * from './search';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  home,
  comic,
  // bookmark,
  // browsingHistory,
  // content,
  // images,
  search
});

export default rootReducer;
