import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import { BookmarkActions, BookmarkActionTypes } from '../actions/bookmark';
import { writeFileSync } from '../../utils/writeFileSync';
import { BookmarkItem } from '../../typings';

export const bookmarkDirectory = path.join(remote.app.getPath('userData'), 'comic-reader', 'bookmark.json');

export interface BookmarksMapVal {
  comicID: string;
  bookmarkItem: BookmarkItem;
}

type BookmarksMap = Array<[string, BookmarksMapVal]>;

export interface BookmarkState {
  bookmarks: BookmarksMap;
  removable: boolean;
}

const initialBookmark: BookmarksMap = fs.existsSync(bookmarkDirectory)
  ? JSON.parse(fs.readFileSync(bookmarkDirectory, 'utf8'))
  : [];

const initialState: BookmarkState = {
  bookmarks: initialBookmark,
  removable: false
};

export default function(state = initialState, action: BookmarkActions) {
  const mappedBookmarks = new Map(state.bookmarks.slice(0));

  switch (action.type) {
    case BookmarkActionTypes.ADD_BOOKMARK_SUCCESS:
    case BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS:
      const gridData = action.payload;

      return {
        ...state,
        bookmarks: [
          ...mappedBookmarks.set(gridData.comicID, {
            comicID: gridData.comicID,
            bookmarkItem: gridData
          })
        ]
      };

    case BookmarkActionTypes.REMOVE_BOOKMARK:
      mappedBookmarks.delete(action.payload);

      return {
        ...state,
        bookmarks: [...mappedBookmarks]
      };

    case BookmarkActionTypes.REMOVE_ALL_BOOKMARK:
      return {
        ...state,
        bookmarks: []
      };

    case BookmarkActionTypes.TOGGLE_BOOKMARK_REMOVABLE:
      return {
        ...state,
        removable: typeof action.payload !== 'undefined' ? action.payload : !state.removable
      };

    case BookmarkActionTypes.SAVE_BOOKMARK:
      writeFileSync(bookmarkDirectory, state.bookmarks);

      return state;

    default:
      return state;
  }
}
