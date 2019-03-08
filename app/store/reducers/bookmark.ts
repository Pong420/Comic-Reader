import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import {
  BookmarkActions,
  BookmarkActionTypes,
  AddBookmarkPayload
} from '../actions/bookmark';
import { writeFileSync } from '../../utils/writeFileSync';

export const bookmarkDirectory = path.join(
  remote.app.getPath('userData'),
  'comic-reader',
  'bookmark.json'
);

type Bookmark = [string, AddBookmarkPayload][];

export interface BookmarkState {
  bookmarks: Bookmark;
  removable: boolean;
}

const initialBookmark = (fs.existsSync(bookmarkDirectory)
  ? JSON.parse(fs.readFileSync(bookmarkDirectory, 'utf8'))
  : []) as Bookmark;

const initialState: BookmarkState = {
  bookmarks: initialBookmark,
  removable: false
};

export default function(state = initialState, action: BookmarkActions) {
  const mappedBookmarks = new Map(state.bookmarks.slice(0));

  switch (action.type) {
    case BookmarkActionTypes.ADD_BOOKMARK_SUCCESS:
      mappedBookmarks.delete(action.payload.comicID);

      return {
        ...state,
        bookmarks: [
          ...mappedBookmarks.set(action.payload.comicID, action.payload)
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

    case BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS:
      mappedBookmarks.set(action.payload.comicID, action.payload);

      return {
        ...state,
        bookmarks: [
          ...mappedBookmarks.set(action.payload.comicID, action.payload)
        ]
      };

    case BookmarkActionTypes.TOGGLE_BOOKMARK_REMOVABLE:
      return {
        ...state,
        removable: action.payload
      };

    case BookmarkActionTypes.SAVE_BOOKMARK:
      writeFileSync(bookmarkDirectory, state.bookmarks);

      return state;

    default:
      return state;
  }
}
