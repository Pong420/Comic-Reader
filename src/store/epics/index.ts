import { combineEpics } from 'redux-observable';
import homeEpic from './home';
import comicEpic from './comic';
import searchEpic from './search';
// import bookmarkEpic from './bookmark';
// import browsingHistoryEpic from './browsingHistory';
// import contentEpic from './content';
// import imagesEpic from './images';

export default combineEpics(
  ...homeEpic,
  ...comicEpic,
  ...searchEpic
  //   ...bookmarkEpic,
  //   ...browsingHistoryEpic,
  //   ...comicEpic,
  //   ...contentEpic,
  //   ...imagesEpic,
);
