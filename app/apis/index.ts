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
  getSearchResults
} from './source/IKanman';

let getComicListQueue = Promise.resolve<ComicItemList>([]);
let getSearchResultQueue = Promise.resolve<SearchResults>([]);

export function getComicListAPI(params: GetComicListParam) {
  const next = () => getComicList(params);
  getComicListQueue = getComicListQueue.then(next).catch(next);

  return getComicListQueue;
}

export function getGridDataAPI(params: GetComicDataParam) {
  return getComicData(params).then(
    ({ adultOnly, chapters, finished, intro, details, title, ...gridData }) =>
      gridData as GridData
  );
}

export async function getComicDataAPI(params: GetComicDataParam) {
  return getComicData(params);
}

export async function getContentDataAPI(params: GetContentDataParam) {
  return getContentData(params);
}

export function getSearchResultsAPI(params: GetSearchResultsParam) {
  const next = () => getSearchResults(params);
  getSearchResultQueue = getSearchResultQueue.then(next).catch(next);

  return getSearchResultQueue;
}
