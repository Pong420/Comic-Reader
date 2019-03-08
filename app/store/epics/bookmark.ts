import { ofType, Epic } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import { BookmarkActions, BookmarkActionTypes } from '../actions/bookmark';
import { createGridDataEpic } from './gridData';

const addBookmarkEpic = createGridDataEpic(
  BookmarkActionTypes.ADD_BOOKMARK,
  BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
  BookmarkActionTypes.REMOVE_BOOKMARK
);

const refetchBookmarkEpic = createGridDataEpic(
  BookmarkActionTypes.REFETCH_BOOKMARK,
  BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS,
  ''
);

const saveBookmarkEpic: Epic<BookmarkActions> = action$ =>
  action$.pipe(
    ofType<BookmarkActions>(
      BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
      BookmarkActionTypes.REMOVE_BOOKMARK,
      BookmarkActionTypes.REMOVE_ALL_BOOKMARK,
      BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS
    ),
    mapTo<BookmarkActions, BookmarkActions>({
      type: BookmarkActionTypes.SAVE_BOOKMARK
    })
  );

export default [addBookmarkEpic, refetchBookmarkEpic, saveBookmarkEpic];
