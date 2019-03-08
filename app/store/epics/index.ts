import { combineEpics } from 'redux-observable';
import bookmarkEpic from './bookmark';
import browsingHistoryEpic from './browsingHistory';
import comicListEpic from './comicList';
import searchEpic from './search';

export default combineEpics(
  ...bookmarkEpic,
  ...browsingHistoryEpic,
  ...comicListEpic,
  ...searchEpic
);
