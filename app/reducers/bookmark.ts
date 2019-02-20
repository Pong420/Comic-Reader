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

interface Bookmarked {
  [comicID: string]: BookmarkItem;
}

export interface BookmarkState {
  bookmarks: Bookmarks;
  bookmarked: Bookmarked;
}

const initialBookmarks: Bookmarks = fs.existsSync(storeDirectory)
  ? JSON.parse(fs.readFileSync(storeDirectory, 'utf8'))
  : [];

const initialState: BookmarkState = {
  bookmarks: initialBookmarks,
  bookmarked: getBookmarked(initialBookmarks)
};

console.log(storeDirectory, initialBookmarks);

export default function(state = initialState, action: BookmarkTypes) {
  switch (action.type) {
    case BookmarkKeys.SAVE_BOOKMARK:
      writeFileSync(storeDirectory, state.bookmarks);

      return state;
    case BookmarkKeys.SET_BOOKMARK:
      const { bookmarks } = action.payload;
      return {
        ...state,
        bookmarks,
        bookmarked: getBookmarked(bookmarks)
      };
    case BookmarkKeys.ADD_BOOKMARK:
      const { comicID, bookmarkItem } = action.payload;
      return {
        bookmarks: [bookmarkItem, ...state.bookmarks].filter(v => !!v),
        bookmarked: {
          ...state.bookmarked,
          [comicID]: bookmarkItem
        }
      };
    case BookmarkKeys.REMOVE_BOOKMARK:
      const newBookmarks = state.bookmarks.filter(({ comicID }) => {
        return String(comicID) !== action.payload.comicID;
      });

      return {
        ...state,
        bookmarks: newBookmarks,
        bookmarked: getBookmarked(newBookmarks)
      };
    default:
      return state;
  }
}

function getBookmarked(bookmarks: Bookmarks) {
  return bookmarks.reduce<Bookmarked>((result, item) => {
    result[item.comicID] = item;

    return result;
  }, {});
}
