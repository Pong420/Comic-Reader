import { combineEpics } from 'redux-observable';
import comicsEpics from './comics';
import comicDataEpics from './comicData';
import contentEpics from './content';

export default combineEpics(...comicsEpics, ...comicDataEpics, ...contentEpics);
