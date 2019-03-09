import { combineEpics } from 'redux-observable';
import bookmarkEpic from './bookmark';
import browsingHistoryEpic from './browsingHistory';
import contentEpic from './content';
import comicListEpic from './comicList';
import imagesEpic from './images';
import searchEpic from './search';

export default combineEpics(
  ...bookmarkEpic,
  ...browsingHistoryEpic,
  ...contentEpic,
  ...comicListEpic,
  ...imagesEpic,
  ...searchEpic
);
