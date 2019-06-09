import fs from 'fs';
import { RouterAction, LOCATION_CHANGE } from 'connected-react-router';
import { BookmarkActionTypes, BookmarkActions } from '../actions/bookmark';
import { Schema$Bookmark } from '../../typings';
import { BOOKMARK_DIRECTORY } from '../../constants';

type BookmarkMap = Schema$Bookmark[];

export interface BookmarkState {
  bookmark: BookmarkMap;
  seletable: boolean;
  selection: string[];
}

const getBookmark = (): BookmarkMap =>
  fs.existsSync(BOOKMARK_DIRECTORY)
    ? JSON.parse(fs.readFileSync(BOOKMARK_DIRECTORY, 'utf8'))
    : [];

const initialState: BookmarkState = {
  bookmark: getBookmark(),
  seletable: false,
  selection: []
};

export default function(
  state = initialState,
  action: BookmarkActions | RouterAction
) {
  const mappedBookmark = new Map(state.bookmark.slice(0));

  switch (action.type) {
    case BookmarkActionTypes.ADD_BOOKMARK:
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
      Array.from(action.payload).forEach(comicID =>
        mappedBookmark.delete(comicID)
      );

      return {
        ...state,
        bookmark: [...mappedBookmark]
      };

    case BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS:
      mappedBookmark.set(action.payload.comicID, action.payload);

      return {
        ...state,
        bookmark: [...mappedBookmark]
      };

    case BookmarkActionTypes.UPDATE_BOOKMARK_SELECTION:
      return {
        ...state,
        selection: action.payload
      };

    case BookmarkActionTypes.TOGGLE_BOOKMARK_SELECTION:
      return {
        ...state,
        selection: [],
        seletable:
          typeof action.payload !== 'undefined'
            ? action.payload
            : !state.seletable
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        selection: [],
        seletable: false
      };

    default:
      return state;
  }
}
