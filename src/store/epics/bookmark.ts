import { from } from 'rxjs';
import { map, mergeMap, mapTo } from 'rxjs/operators';
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
