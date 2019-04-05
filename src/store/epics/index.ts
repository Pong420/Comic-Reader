import { combineEpics } from 'redux-observable';
import homeEpic from './home';
import comicEpic from './comic';
// import bookmarkEpic from './bookmark';
// import browsingHistoryEpic from './browsingHistory';
// import contentEpic from './content';
// import imagesEpic from './images';
// import searchEpic from './search';

export default combineEpics(
  ...homeEpic,
  ...comicEpic
  //   ...bookmarkEpic,
  //   ...browsingHistoryEpic,
  //   ...comicEpic,
  //   ...contentEpic,
  //   ...imagesEpic,
  //   ...searchEpic
);
