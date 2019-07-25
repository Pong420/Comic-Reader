import { Storage } from './storage';
import { BOOKMARK_DIRECTORY } from '../constants';
import { Schema$Bookmark } from '../typings';

interface Schema {
  byIds: {
    [comicID: string]: Schema$Bookmark;
  };
  ids: string[];
}

export type Schema$BookmarkStorage = Schema;

const defaultValue = {
  byIds: {},
  ids: []
};

export const bookmarkStorage = new Storage<Schema>(
  BOOKMARK_DIRECTORY,
  defaultValue
);

// For user who upgrade from 4.0.0 or before
const data = bookmarkStorage.get();
if (Array.isArray(data)) {
  const ids: string[] = [];
  const byIds = data.reduce<Schema['byIds']>((result, [comicID, item]) => {
    ids.push(comicID);
    result[comicID] = item;
    return result;
  }, {});
  bookmarkStorage.save({ byIds, ids });
}
