import { LocalStorage } from './storage';
import { FILTER_DATA } from '../constants';

export const filterStorage = LocalStorage<string[]>(
  'COMIC_READER_FILTER',
  new Array(FILTER_DATA.length).fill('')
);
