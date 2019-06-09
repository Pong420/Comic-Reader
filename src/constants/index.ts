import path from 'path';
import { remote } from 'electron';

export { default as PATHS } from './paths.json';

export const STORAGE_DIRECTORY = path.join(
  remote.app.getPath('userData'),
  'comic-reader'
);

export const BROWSING_HISTORY_DIRECTORY = path.join(
  STORAGE_DIRECTORY,
  'browsing_history.json'
);

export const BOOKMARK_DIRECTORY = path.join(STORAGE_DIRECTORY, 'bookmark.json');
