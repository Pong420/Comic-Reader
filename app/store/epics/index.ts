import { combineEpics } from 'redux-observable';
import comicListEpic from './comicList';
import searchEpic from './search';

export default combineEpics(...comicListEpic, ...searchEpic);
