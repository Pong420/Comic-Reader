import { combineEpics } from 'redux-observable';
import homeEpic from './home';
// import bookmarkEpic from './bookmark';
// import browsingHistoryEpic from './browsingHistory';
// import comicEpic from './comic';
// import contentEpic from './content';
// import imagesEpic from './images';
// import searchEpic from './search';

export default combineEpics(
  ...homeEpic
  //   ...bookmarkEpic,
  //   ...browsingHistoryEpic,
  //   ...comicEpic,
  //   ...contentEpic,
  //   ...imagesEpic,
  //   ...searchEpic
);
