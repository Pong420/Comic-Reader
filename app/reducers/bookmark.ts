import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import { Bookmarks } from '../../typing';
import { BookmarkKeys, BookmarkTypes } from '../actions/bookmark';
import { writeFileSync } from '../utils/writeFileSync';

const storeDirectory = path.join(
  remote.app.getPath('userData'),
  'comic-reader',
  'bookmark.json'
);

export interface BookmarkState {
  bookmarks: Bookmarks;
}

const initialState: BookmarkState = {
  bookmarks: fs.existsSync(storeDirectory)
    ? JSON.parse(fs.readFileSync(storeDirectory, 'utf8'))
    : []
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
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
