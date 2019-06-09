import fs from 'fs';
import { BookmarkActionTypes, BookmarkActions } from '../actions/bookmark';
import { ContentActions, ContentActionTypes } from '../actions/content';
import { Schema$Bookmark } from '../../typings';
import { BOOKMARK_DIRECTORY } from '../../constants';

type BookmarkMap = Schema$Bookmark[];

export interface BookmarkState {
  bookmark: BookmarkMap;
  removable: boolean;
}

const getBookmark = (): BookmarkMap =>
  fs.existsSync(BOOKMARK_DIRECTORY)
    ? JSON.parse(fs.readFileSync(BOOKMARK_DIRECTORY, 'utf8'))
    : [];

const initialState: BookmarkState = {
  bookmark: getBookmark(),
  removable: false
};

export default function(
  state = initialState,
  action: BookmarkActions | ContentActions
) {
  const mappedBookmark = new Map(state.bookmark.slice(0));

  switch (action.type) {
    case ContentActionTypes.GET_CONTENT:
      mappedBookmark.delete(action.payload.comicID);
      mappedBookmark.set(action.payload.comicID, action.payload);

    // eslint-disable-next-line
    case BookmarkActionTypes.ADD_BOOKMARK_SUCCESS:
      return (() => {
        const { comicID } = action.payload;
        mappedBookmark.set(comicID, {
          ...mappedBookmark.get(comicID)!,
          ...action.payload
        });

        return {
          ...state,
          bookmark: [...mappedBookmark]
        };
      })();

    case BookmarkActionTypes.REMOVE_BOOKMARK:
      mappedBookmark.delete(action.payload);

      return {
        ...state,
        bookmark: [...mappedBookmark]
      };

    case BookmarkActionTypes.REMOVE_ALL_BOOKMARK:
      return {
        ...state,
        bookmark: []
      };

    case BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS:
      mappedBookmark.set(action.payload.comicID, action.payload);

      return {
        ...state,
        bookmark: [...mappedBookmark]
      };

    case BookmarkActionTypes.TOGGLE_BOOKMARK_REMOVABLE:
      return {
        ...state,
        removable:
          typeof action.payload !== 'undefined'
            ? action.payload
            : !state.removable
      };

    default:
      return state;
  }
}
