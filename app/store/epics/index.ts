import { combineEpics } from 'redux-observable';
import bookmarkEpic from './bookmark';
import browsingHistoryEpic from './browsingHistory';
import comicEpic from './comic';
import comicListEpic from './comicList';
import contentEpic from './content';
import imagesEpic from './images';
import searchEpic from './search';

export default combineEpics(
  ...bookmarkEpic,
  ...browsingHistoryEpic,
  ...comicEpic,
  ...contentEpic,
  ...comicListEpic,
  ...imagesEpic,
  ...searchEpic
);
