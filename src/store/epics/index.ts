import { combineEpics } from 'redux-observable';
import homeEpic from './home';
import comicEpic from './comic';

export default combineEpics(...homeEpic, ...comicEpic);
