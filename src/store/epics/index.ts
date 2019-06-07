import { combineEpics } from 'redux-observable';
import homeEpic from './home';
import comicEpic from './comic';
import contentEpic from './content';

export default combineEpics(...homeEpic, ...comicEpic, ...contentEpic);
