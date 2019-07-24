import { combineEpics } from 'redux-observable';
import comicsEpics from './comics';
import comicDataEpics from './comicData';
import contentEpics from './content';
import browsingHistoryEpics from './browsingHistory';

export default combineEpics(
  ...comicsEpics,
  ...comicDataEpics,
  ...contentEpics,
  ...browsingHistoryEpics
);
