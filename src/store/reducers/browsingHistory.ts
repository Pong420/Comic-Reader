import { createCRUDReducer } from '@pong420/redux-crud';
import { BrowsingHistoryActionTypes } from '../actions/browsingHistory';
import { Schema$BrowsingHistory } from '../../typings';

export const [, browsingHistoryReducer] = createCRUDReducer<
  Schema$BrowsingHistory,
  'comicID'
>({
  key: 'comicID',
  actions: BrowsingHistoryActionTypes
});
