import { combineEpics } from 'redux-observable';
import comicListEpic from './comicList';

export default combineEpics(...comicListEpic);
