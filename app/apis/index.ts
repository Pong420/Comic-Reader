import {
  GetLatestUpdateParam,
  ComicItemList,
  GetComicDataParam,
  GetContentDataParam,
  SearchParam,
  SearchResults
} from '../../typing';

import {
  getLatestUpdate,
  getComicData,
  getContentData,
  search
} from './source/IKanman';

let getLatestUpdateQueue = Promise.resolve<ComicItemList>([]);
let getSearchResultQueue = Promise.resolve<SearchResults>([]);

export function getLatestUpdateAPI(params?: GetLatestUpdateParam) {
  getLatestUpdateQueue = getLatestUpdateQueue.then(() =>
    getLatestUpdate(params || {})
  );

  return getLatestUpdateQueue;
}

export function getComicDataAPI(params: GetComicDataParam) {
  return getComicData(params);
}

export function getContentDataAPI(params: GetContentDataParam) {
  return getContentData(params);
}

export function searchAPI(params: SearchParam) {
  getSearchResultQueue = getSearchResultQueue.then(() => search(params));

  return getSearchResultQueue;
}
