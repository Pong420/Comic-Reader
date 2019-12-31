/// <reference types="pong-react-scripts" />

declare module '*.scss';
declare module 'react-desktop/macOs';

declare interface Window {
  SMH: {
    imgData?: (
      n: T
    ) => {
      preInit: () => T;
    };
  };
}

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare namespace NodeJS {
  interface Module {
    hot?: { accept: (path?: string, callback?: () => void) => void };
  }
}

declare interface System {
  import<T = any>(module: string): Promise<T>;
}
declare var System: System;

declare const process: any;
declare const require: any;

interface Schema$GridData {
  comicID: string;
  cover: string;
  name: string;
  latest: string;
  updateTime: string;
  author?: string;
}

interface Schema$Bookmark extends Partial<Schema$GridData> {
  comicID: string;
}

interface Schema$BrowsingHistory extends Partial<Schema$GridData> {
  comicID: string;
  chapterID: string;
}

interface ToStorageValue<T extends {}, K extends keyof T> {
  ids: T[K][];
  byIds: { [X: T[K]]: T };
}

interface Window {
  bookmarkStorage: Schema$Storage<ToStorageValue<Schema$Bookmark, 'comicID'>>;
  browsingHistoryStorage: Schema$Storage<
    ToStorageValue<Schema$BrowsingHistory, 'comicID'>
  >;
}
