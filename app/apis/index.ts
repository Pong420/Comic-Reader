import {
  GetComicListParam,
  ComicItemList,
  GetComicDataParam,
  GetContentDataParam,
  GetSearchResultsParam,
  SearchResults,
  GridData
} from '../../typing';

import {
  getComicList,
  getComicData,
  getContentData,
  search
} from './source/IKanman';

let getComicListQueue = Promise.resolve<ComicItemList>([]);
let getSearchResultQueue = Promise.resolve<SearchResults>([]);

export function getComicListAPI(params: GetComicListParam) {
  getComicListQueue = getComicListQueue.then(() => getComicList(params));

  return getComicListQueue;
}

export function getGridDataAPI(params: GetComicDataParam) {
  return getComicData(params).then(
    ({ adultOnly, chapters, finished, intro, details, title, ...gridData }) =>
      gridData as GridData
  );
}

export function getComicDataAPI(params: GetComicDataParam) {
  return getComicData(params);
}

export function getContentDataAPI(params: GetContentDataParam) {
  return getContentData(params);
}

export function getSearchResultsAPI(params: GetSearchResultsParam) {
  getSearchResultQueue = getSearchResultQueue.then(() => search(params));

  return getSearchResultQueue;
}
