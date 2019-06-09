import { combineEpics } from 'redux-observable';
import homeEpic from './home';
import comicEpic from './comic';
import contentEpic from './content';
import searchEpic from './search';
import browsingHistoryEpic from './browsingHistory';
import bookmark from './bookmark';

export default combineEpics(
  ...homeEpic,
  ...comicEpic,
  ...contentEpic,
  ...searchEpic,
  ...browsingHistoryEpic,
  ...bookmark
);
