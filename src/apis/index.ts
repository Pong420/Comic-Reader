import {
  Param$ComicList,
  Param$ComicData,
  Param$Schema$ContentData,
  Param$SearchResult,
  Schema$GridData
} from '../typings';
import {
  getComicList,
  getComicData,
  getContentData,
  getSearchResults
} from './source/IKanman';

export async function getComicListAPI(params: Param$ComicList) {
  return getComicList(params);
}

export function getGridDataAPI(params: Param$ComicData) {
  return getComicData(params).then<Schema$GridData>(
    ({ adultOnly, chapters, finished, intro, details, title, ...gridData }) =>
      gridData
  );
}

export async function getComicDataAPI(params: Param$ComicData) {
  return getComicData(params);
}

export async function getContentDataAPI(params: Param$Schema$ContentData) {
  return getContentData(params);
}

export async function getSearchResultsAPI(params: Param$SearchResult) {
  return getSearchResults(params);
}
