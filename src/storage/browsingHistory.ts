import { Storage } from './storage';
import { BROWSING_HISTORY_DIRECTORY } from '../constants';
import { Schema$BrowsingHistory } from '../typings';

interface Schema {
  byIds: {
    [comicID: string]: Schema$BrowsingHistory;
  };
  ids: string[];
}

export type Schema$BrowsingHistoryStorage = Schema;

const defaultValue = {
  byIds: {},
  ids: []
};

export const browsingHistoryStorage = new Storage<Schema>(
  BROWSING_HISTORY_DIRECTORY,
  defaultValue
);

// For user who upgrade from 4.0.0 or before
const data = browsingHistoryStorage.get();
if (Array.isArray(data)) {
  const ids: string[] = [];
  const byIds = data.reduce<Schema['byIds']>((result, [comicID, item]) => {
    ids.push(comicID);
    result[comicID] = item;
    return result;
  }, {});
  browsingHistoryStorage.save({ byIds, ids });
}
