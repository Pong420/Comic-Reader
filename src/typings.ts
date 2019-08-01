import { AxiosError } from 'axios';

interface MyObject<T> {
  [key: string]: T;
}

export interface Schema$Data<T, K extends keyof T> {
  byIds: MyObject<T>;
  ids: Array<T[K]>;
}

export interface CustomApiError {
  response: {
    status: string | number;
    statusText: string;
  };
}

export type ApiError = AxiosError | CustomApiError;

export interface ApiRequestStatus {
  error: ApiError | null;
  loading: boolean;
}

export interface Params$ComicList {
  page: number;
  type?: string;
  filter?: string[];
}

export interface Params$GridData {
  comicID: string;
}

export interface Params$ComicData {
  comicID: string;
}

export interface Params$ContentData {
  comicID: string;
  chapterID: string;
}

export interface Params$SearchResult {
  keyword: string;
  page: number;
  order?: number;
}

export interface Schema$GridData {
  comicID: string;
  cover: string;
  name: string;
  latest: string;
  updateTime: string;
  author?: string;
}

export interface Schema$ComicItem extends Schema$GridData {
  status: string;
}

export interface Schema$ComicData {
  author: string;
  adultOnly: boolean;
  cover: string;
  comicID: string;
  chapters: {
    byIds: MyObject<Schema$ChpaterItem>;
    byTypes: MyObject<string[]>;
    types: string[];
  };
  details: MyObject<string>;
  name: string;
  finished: boolean;
  intro: string;
  latest: string;
  title: string[];
  updateTime: string;
}

export interface Schema$ChpaterItem {
  chapterID: string;
  title: string;
  p: string;
  isNew: boolean;
}

export interface Schema$ContentData {
  images: string[];
  prevId?: number;
  nextId?: number;
}

export interface Schema$ImageDetail {
  index: number;
  src: string;
  width?: number;
  height?: number;
  loaded: boolean;
  error: boolean;
}

export type Response$LoadImage = Pick<
  Schema$ImageDetail,
  'src' | 'width' | 'height'
>;

export type Response$SearchResult = Schema$Data<Schema$SearchResult, 'comicID'>;

export interface Schema$SearchResult extends Schema$GridData {
  author: string;
  category: string[];
}

export interface Schema$Bookmark extends Partial<Schema$GridData> {
  comicID: string;
}

export interface Schema$BrowsingHistory extends Partial<Schema$GridData> {
  comicID: string;
  chapterID: string;
}

export type Schema$FilterData = Array<[string, Schema$FilterItem[]]>;

export interface Schema$FilterItem {
  label: string;
  val: string;
}
