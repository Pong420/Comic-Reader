import { combineEpics } from 'redux-observable';
import comicsEpics from './comics';

export default combineEpics(...comicsEpics);
