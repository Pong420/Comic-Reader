import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import { BookmarkItem } from '../../typing';
import { BookmarkKeys, BookmarkTypes } from '../actions/bookmark';
import { writeFileSync } from '../utils/writeFileSync';

const storeDirectory = path.join(
  remote.app.getPath('userData'),
  'comic-reader',
  'bookmark.json'
);

interface Temp {
  comicID: string;
  bookmarkItem: BookmarkItem;
}

export interface BookmarkState {
  bookmarks: [string, Temp][];
}

const initialBookmarks: [string, Temp][] = fs.existsSync(storeDirectory)
  ? JSON.parse(fs.readFileSync(storeDirectory, 'utf8'))
  : [];

const initialState: BookmarkState = {
  bookmarks: initialBookmarks
};

export default function(state = initialState, action: BookmarkTypes) {
  const mappedBookmarks = new Map(state.bookmarks.slice(0));

  switch (action.type) {
    case BookmarkKeys.SAVE_BOOKMARK:
      writeFileSync(storeDirectory, state.bookmarks);

      return state;
    case BookmarkKeys.SET_BOOKMARK:
      mappedBookmarks.set(action.payload.comicID, action.payload);

      return {
        ...state,
        bookmarks: [
          ...mappedBookmarks.set(action.payload.comicID, action.payload)
        ]
      };
    case BookmarkKeys.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [
          ...mappedBookmarks.set(action.payload.comicID, action.payload)
        ]
      };
    case BookmarkKeys.REMOVE_BOOKMARK:
      mappedBookmarks.delete(action.payload.comicID);

      return {
        ...state,
        bookmarks: [...mappedBookmarks]
      };
    default:
      return state;
  }
}
