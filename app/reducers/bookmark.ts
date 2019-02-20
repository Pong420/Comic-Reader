import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import { Bookmarks, BookmarkItem } from '../../typing';
import { BookmarkKeys, BookmarkTypes } from '../actions/bookmark';
import { writeFileSync } from '../utils/writeFileSync';

const storeDirectory = path.join(
  remote.app.getPath('userData'),
  'comic-reader',
  'bookmark.json'
);

export interface BookmarkState {
  bookmarks: Bookmarks;
  bookmarked: Map<string, BookmarkItem>;
}

const initialBookmarks: Bookmarks = fs.existsSync(storeDirectory)
  ? JSON.parse(fs.readFileSync(storeDirectory, 'utf8'))
  : [];

const bookmarked = new Map<string, BookmarkItem>(
  initialBookmarks.map<[string, BookmarkItem]>(val => [val.comicID, val])
);

const initialState: BookmarkState = {
  bookmarks: initialBookmarks,
  bookmarked
};

export default function(state = initialState, action: BookmarkTypes) {
  switch (action.type) {
    case BookmarkKeys.SAVE_BOOKMARK:
      writeFileSync(storeDirectory, state.bookmarks);

      return state;
    case BookmarkKeys.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload.bookmark]
      };
    case BookmarkKeys.SET_BOOKMARK:
      return {
        ...action.payload,
        ...state
      };
    default:
      return state;
  }
}
