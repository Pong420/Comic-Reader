import { combineEpics } from 'redux-observable';
import browsingHistoryEpic from './browsingHistory';
import comicListEpic from './comicList';
import searchEpic from './search';

export default combineEpics(
  ...browsingHistoryEpic,
  ...comicListEpic,
  ...searchEpic
);
