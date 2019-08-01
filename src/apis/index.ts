import {
  Params$ComicList,
  Params$ComicData,
  Params$ContentData,
  Params$SearchResult,
  Schema$GridData
} from '../typings';
import {
  getComicList,
  getComicData,
  getContentData,
  getSearchResults
} from './source/IKanman';
import pick from 'lodash.pick';

export async function getComicListAPI(params: Params$ComicList) {
  return getComicList(params);
}

export function getGridDataAPI(params: Params$ComicData) {
  return getComicData(params).then<Schema$GridData>(data =>
    pick(data, ['comicID', 'cover', 'name', 'latest', 'updateTime', 'author'])
  );
}

export async function getComicDataAPI(params: Params$ComicData) {
  return getComicData(params);
}

export async function getContentDataAPI(params: Params$ContentData) {
  return getContentData(params);
}

export async function getSearchResultsAPI(params: Params$SearchResult) {
  return getSearchResults(params);
}
