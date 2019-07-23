import { combineEpics } from 'redux-observable';
import comicsEpics from './comics';
import comicDataEpics from './comicData';

export default combineEpics(...comicsEpics, ...comicDataEpics);
