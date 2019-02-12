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

export type ComicItemList = ComicItemProps[];

export interface ComicItemProps {
  comicID: string;
  cover: string;
  status: string;
  name: string;
  latest: string;
  updateTime: string;
}

export interface ComicData extends GetComicDataParam, ComicHeader {
  chapters: Chapters;
  adultOnly: boolean;
}

export interface ComicHeader {
  cover: string;
  latest: string;
  finished: boolean;
  intro: string;
  title: string[];
  details: {
    [key: string]: string;
  }[];
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

type Icon =
  | ComponentType<any>
  | {
      component: ComponentType<any>;
      [props: string]: any;
    };

export type SidebarIcons = Icon[];
