import { createCRUDReducer } from '@pong420/redux-crud';
import { ComicActionTypes } from '../actions/comics';
import { Schema$ComicItem } from '../../typings';

export const [, comicsReducer] = createCRUDReducer<Schema$ComicItem, 'comicID'>(
  {
    key: 'comicID',
    actions: ComicActionTypes,
    pageSize: 42
  }
);
