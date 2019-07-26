import { FileStorage, BROWSING_HISTORY_DIRECTORY } from './storage';
import { Schema$BrowsingHistory, Schema$Data } from '../typings';

type Schema = Schema$Data<Schema$BrowsingHistory, 'comicID'>;

export type Schema$BrowsingHistoryStorage = Schema;

const defaultValue = {
  byIds: {},
  ids: []
};

export const browsingHistoryStorage = FileStorage<Schema>(
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
