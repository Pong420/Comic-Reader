import { AxiosError } from 'axios';

export interface CustomApiError {
  response: {
    status: string | number;
    statusText: string;
  };
}

export type ApiError = AxiosError | CustomApiError | Error;

export interface Params$ComicList {
  page?: number;
  type?: string;
  filter?: string[];
}

export interface Params$ComicDetails {
  comicID: string;
}

export interface Params$ComicContent {
  comicID: string;
  chapterID: string;
}

export interface Schema$ChpaterItem {
  chapterID: string;
  title: string;
  p: string;
  isNew: boolean;
}

export interface Params$SearchResult {
  keyword: string;
  page: number;
  order?: number;
}

export interface Schema$ComicItem extends Schema$GridData {
  status: string;
}

export interface Schema$ComicDetails {
  author: string;
  adultOnly: boolean;
  cover: string;
  comicID: string;
  chapters: {
    byTypes: Record<string, Schema$ChpaterItem[]>;
    types: string[];
  };
  details: Record<string, string>;
  name: string;
  finished: boolean;
  intro: string;
  latest: string;
  title: string[];
  updateTime: string;
}

export interface Schema$ComicContent {
  images: string[];
  prevId?: number;
  nextId?: number;
}

export interface Schema$SearchResult extends Schema$GridData {
  author: string;
  category: string[];
}

export interface Schema$ImageDetail {
  index: number;
  src: string;
  width?: number;
  height?: number;
  loaded: boolean;
  error: boolean;
}

export type Response$Pagination<T> = {
  total: number;
  pageNo: number;
  data: T[];
};

export type Response$ComicList = Response$Pagination<Schema$ComicItem>;

export type Response$SearchResult = Response$Pagination<Schema$SearchResult>;

export type Response$LoadImage = Pick<
  Schema$ImageDetail,
  'src' | 'width' | 'height'
>;

export type Schema$FilterData = Array<[string, Schema$FilterItem[]]>;

export interface Schema$FilterItem {
  label: string;
  val: string;
}
