import { AxiosError } from 'axios';

export interface CustomApiError {
  response: {
    status: string | number;
    statusText: string;
  };
}

export type ApiError = AxiosError | CustomApiError;

export type Error = ApiError | boolean;

export interface ApiRequestStatus {
  error: Error;
  loading: boolean;
}

export interface Param$ComicList {
  page: number;
  type?: string;
  filter?: string[];
}

export interface Param$GridData {
  comicID: string;
}

export interface Param$ComicData {
  comicID: string;
}

export interface Param$ContentData {
  comicID: string;
  chapterID: string;
}

export interface Param$SearchResult {
  keyword: string;
  page: number;
}

export interface Schema$GridData {
  comicID: string;
  cover: string;
  name: string;
  latest: string;
  updateTime: string;
}

export interface Schema$ComicItem extends Schema$GridData {
  status: string;
}

export interface Schema$ComicData extends ComicHeaderProps {
  comicID: string;
  chapters: Schema$Chapters;
  adultOnly: boolean;
  name: string;
  updateTime: string;
}

export interface ComicHeaderDetails {
  [key: string]: string;
}

export interface ComicHeaderProps {
  cover: string;
  latest: string;
  finished: boolean;
  intro: string;
  title: string[];
  details: ComicHeaderDetails[];
}

export interface Schema$Chapters {
  [key: string]: Schema$ChpaterItem[];
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

export interface Schema$SearchResult extends Schema$GridData {
  author: string;
  category: string[];
}

export type Schema$Bookmark = [
  string,
  Partial<Schema$GridData> & Param$GridData
];

export type Schema$BrowsingHistory = [
  string,
  Partial<Schema$GridData> & Param$ContentData
];

export type FilterData = Array<[string, FilterElement[]]>;

export interface FilterElement {
  label: string;
  val: string;
}
