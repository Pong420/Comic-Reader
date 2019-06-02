import { AxiosError } from 'axios';

export interface CustomApiError {
  response: {
    status: string | number;
    statusText: string;
  };
}

export type ApiError = AxiosError | CustomApiError;

export interface Param$ComicList {
  page: number;
  type?: string;
  filter?: string[];
}

export interface Param$Schema$GridData {
  comicID: string;
}

export interface Param$Schema$ComicData {
  comicID: string;
}

export interface Param$Schema$ContentData {
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

export type ComicItemList = Schema$ComicItem[];

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
  prevId?: number | undefined;
  nextId?: number | undefined;
}

export interface Schema$SearchResult extends Schema$GridData {
  author: string;
  category: string[];
}

export type Schema$Bookmark = Schema$GridData | null;

export type Schema$BrowsingHistory = Schema$GridData | null;

export type FilterData = Array<[string, FilterElement[]]>;

export interface FilterElement {
  label: string;
  val: string;
}
