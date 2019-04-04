import { GetComicListParam, GetComicDataParam, GetContentDataParam, GetSearchResultsParam, GridData } from '../typings';

import { getComicList, getComicData, getContentData, getSearchResults } from './source/IKanman';

export function getComicListAPI(params: GetComicListParam) {
  return getComicList(params);
}

export function getGridDataAPI(params: GetComicDataParam) {
  return getComicData(params).then<GridData>(
    ({ adultOnly, chapters, finished, intro, details, title, ...gridData }) => gridData
  );
}

export async function getComicDataAPI(params: GetComicDataParam) {
  return getComicData(params);
}

export async function getContentDataAPI(params: GetContentDataParam) {
  return getContentData(params);
}

export function getSearchResultsAPI(params: GetSearchResultsParam) {
  return getSearchResults(params);
}
