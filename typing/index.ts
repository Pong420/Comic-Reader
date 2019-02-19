import { ComponentType } from 'react';

export interface GetLatestUpdateParam {
  page?: number;
}

export interface GetComicDataParam {
  comicID?: string;
}

export interface GetContentDataParam {
  comicID?: string;
  chapterID?: string;
}

export interface GridProps {
  comicID: string;
  cover: string;
  name: string;
  latest: string;
  updateTime: string;
}

export interface ComicItem extends GridProps {
  status: string;
}

export type ComicItemList = ComicItem[];

export interface ComicData extends ComicHeader {
  comicID?: string;
  chapters: Chapters;
  adultOnly: boolean;
}

export interface ComicHeaderDetails {
  [key: string]: string;
}

export interface ComicHeader {
  cover: string;
  latest: string;
  finished: boolean;
  intro: string;
  title: string[];
  details: ComicHeaderDetails[];
}

export type Chapters = {
  [key: string]: ChapterList;
};

export type ChapterList = ChpaterItem[];

export interface ChpaterItem {
  chapterID: string;
  title: string;
  p: string;
  isNew: boolean;
}

export interface ContentData {
  images?: string[];
  prevId?: number | undefined;
  nextId?: number | undefined;
}

export interface SearchParam {
  keyword: string;
  page?: number;
}

export interface SearchResultItem extends GridProps {
  author: string;
  category: string[];
}

export type SearchResults = SearchResultItem[];

export type SearchHistory = SearchHistoryItem[];

export type SearchHistoryItem = string;

type Icon =
  | ComponentType<any>
  | {
      component: ComponentType<any>;
      [props: string]: any;
    };

export type SidebarIcons = Icon[];
