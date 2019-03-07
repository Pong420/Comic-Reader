import {
  GetComicListParam,
  ComicItemList,
  GetComicDataParam,
  GetContentDataParam,
  SearchParam,
  SearchResults
} from '../../typing';

import {
  getComicList,
  getComicData,
  getContentData,
  search
} from './source/IKanman';

let getComicListQueue = Promise.resolve<ComicItemList>([]);
let getSearchResultQueue = Promise.resolve<SearchResults>([]);

export function getComicListAPI(params?: GetComicListParam) {
  getComicListQueue = getComicListQueue.then(() => getComicList(params || {}));

  return getComicListQueue;
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
