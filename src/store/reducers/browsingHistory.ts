import { createCRUDReducer } from '@pong420/redux-crud';
import { BrowsingHistoryActionTypes } from '../actions/browsingHistory';

export const [, browsingHistoryReducer] = createCRUDReducer<
  Schema$BrowsingHistory,
  'comicID'
>({
  key: 'comicID',
  actions: BrowsingHistoryActionTypes,
  onLocationChanged: null,
  pageSize: 1000000000000,
  ...window.browsingHistoryStorage.get()
});
