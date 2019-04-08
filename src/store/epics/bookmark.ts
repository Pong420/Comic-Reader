import { from, empty } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BookmarkActions,
  BookmarkActionTypes,
  AddBookmark,
  AddBookmarkSuccess,
  RefetchBookmark,
  RefetchBookmarkSuccess
} from '../actions/bookmark';
import { getGridDataAPI } from '../../apis';
import { GridData } from '../../typings';
import { RootState, bookmarkDirectory } from '../reducers';
import { writeFileSync } from '../../utils/writeFileSync';

const getGridData$ = (comicID: string) =>
  from(
    getGridDataAPI({
      comicID
    })
  );

const addBookmarkEpic: Epic<BookmarkActions> = action$ =>
  action$.pipe(
    ofType<BookmarkActions, AddBookmark>(BookmarkActionTypes.ADD_BOOKMARK),
    mergeMap(action =>
      getGridData$(action.payload).pipe(
        map<GridData, AddBookmarkSuccess>(gridData => ({
          type: BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
          payload: gridData
        }))
      )
    )
  );

const refetchBookmarkEpic: Epic<BookmarkActions> = action$ =>
  action$.pipe(
    ofType<BookmarkActions, RefetchBookmark>(
      BookmarkActionTypes.REFETCH_BOOKMARK
    ),
    mergeMap(action =>
      getGridData$(action.payload).pipe(
        map<GridData, RefetchBookmarkSuccess>(gridData => ({
          type: BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS,
          payload: gridData
        }))
      )
    )
  );

const saveBookmarkEpic: Epic<BookmarkActions, BookmarkActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<BookmarkActions>(
      BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
      BookmarkActionTypes.REMOVE_BOOKMARK,
      BookmarkActionTypes.REMOVE_ALL_BOOKMARK,
      BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS
    ),
    switchMap(() => {
      writeFileSync(bookmarkDirectory, state$.value.bookmark.bookmarks);
      return empty();
    })
  );

export default [addBookmarkEpic, refetchBookmarkEpic, saveBookmarkEpic];
