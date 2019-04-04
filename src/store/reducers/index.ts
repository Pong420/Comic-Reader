import { combineReducers } from 'redux';
import home from './home';

// import bookmark from './bookmark';
// import browsingHistory from './browsingHistory';
// import comic from './comic';
// import content from './content';
// import images from './images';
// import search from './search';

export * from './home';
// export * from './bookmark';
// export * from './browsingHistory';
// export * from './comic';
// export * from './content';
// export * from './images';
// export * from './search';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  home
  // bookmark,
  // browsingHistory,
  // comic,
  // content,
  // images,
  // search
});

export default rootReducer;
