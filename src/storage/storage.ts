import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import { writeFileSync } from '../utils/writeFileSync';

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

export function FileStorage<T extends {}>(
  path: string,
  defaultValue: T
): Schema$Storage<T> {
  function get(): T {
    const val = fs.readFileSync(path, 'utf8');
    return val ? JSON.parse(val) : defaultValue;
  }

  function save(value: T) {
    writeFileSync(path, value);
  }

  return {
    get,
    save
  };
}

export function LocalStorage<T extends {}>(
  key: string,
  defaultValue: T
): Schema$Storage<T> {
  function get(): T {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  }

  function save(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return {
    get,
    save
  };
}
