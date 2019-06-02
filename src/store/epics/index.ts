import { combineEpics } from 'redux-observable';
import homeEpic from './home';

export default combineEpics(...homeEpic);
