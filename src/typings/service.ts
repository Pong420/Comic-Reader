import { TransformDataById } from '../utils/transformDatabyId';

export interface Params$ComicList {
  page: number;
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

export interface Schema$ComicDetails {
  author: string;
  adultOnly: boolean;
  cover: string;
  comicID: string;
  chapters: {
    byIds: Record<string, Schema$ChpaterItem>;
    byTypes: Record<string, string[]>;
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

export type Response$ComicList = {
  total: number;
  pageNo: number;
  data: Schema$ComicItem[];
};

export type Response$SearchResult = TransformDataById<
  Schema$SearchResult,
  'comicID'
>;
