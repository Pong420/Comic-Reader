import { createCRUDReducer } from '@pong420/redux-crud';
import { SearchResultActionTypes } from '../actions/searchResults';
import { Schema$SearchResult } from '../../typings';

const pageSize = 20;

export const [, searchResultsReducer] = createCRUDReducer<
  Schema$SearchResult,
  'comicID'
>({
  key: 'comicID',
  actions: SearchResultActionTypes,
  pageSize,
  pathname: window.location.hash.slice(1).replace(/\?.*/, '')
});
