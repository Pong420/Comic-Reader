import { FileStorage, BOOKMARK_DIRECTORY } from './storage';
import { Schema$Bookmark, Schema$Data } from '../typings';

type Schema = Schema$Data<Schema$Bookmark, 'comicID'>;

export type Schema$BookmarkStorage = Schema;

const defaultValue = {
  byIds: {},
  ids: []
};

export const bookmarkStorage = FileStorage<Schema>(
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
