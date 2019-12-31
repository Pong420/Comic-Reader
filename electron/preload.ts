import fs from 'fs';
import path from 'path';
import { remote } from 'electron';

interface Schema$Storage<T extends {}> {
  get(): T;
  save(value: T): void;
}

export const STORAGE_DIRECTORY = path.join(
  remote.app.getPath('userData'),
  'comic-reader'
);

export const BROWSING_HISTORY_DIRECTORY = path.join(
  STORAGE_DIRECTORY,
  'browsing_history.json'
);

export const BOOKMARK_DIRECTORY = path.join(STORAGE_DIRECTORY, 'bookmark.json');

function FileStorage<T extends {}>(
  path: string,
  defaultValue: T
): Schema$Storage<T> {
  function get(): T {
    const val = fs.readFileSync(path, 'utf8');
    return val ? JSON.parse(val) : defaultValue;
  }
  function save(value: T) {
    fs.writeFileSync(path, value);
  }
  return {
    get,
    save
  };
}

window.bookmarkStorage = FileStorage(BOOKMARK_DIRECTORY, {
  byIds: {},
  ids: []
});

window.browsingHistoryStorage = FileStorage(BROWSING_HISTORY_DIRECTORY, {
  byIds: {},
  ids: []
});
