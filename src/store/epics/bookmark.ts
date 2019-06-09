import { RouterAction } from 'connected-react-router';
import { from, empty } from 'rxjs';
import { map, switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BookmarkActions,
  BookmarkActionTypes,
  AddBookmark,
  AddBookmarkSuccess,
  RefetchBookmark,
  RefetchBookmarkSuccess
} from '../actions/bookmark';
import { RootState } from '../reducers';
import { getGridDataAPI } from '../../apis';
import { Schema$GridData, Param$GridData } from '../../typings';
import { BOOKMARK_DIRECTORY } from '../../constants';
import { writeFileSync } from '../../utils/writeFileSync';

type Actions = BookmarkActions | RouterAction;
type BrowsingHistoryEpic = Epic<Actions, Actions, RootState>;

const getGridData$ = (params: Param$GridData) => from(getGridDataAPI(params));

const addBookmarkEpic: BrowsingHistoryEpic = action$ =>
  action$.pipe(
    ofType<Actions, AddBookmark>(BookmarkActionTypes.ADD_BOOKMARK),
    switchMap(action =>
      getGridData$(action.payload).pipe(
        map<Schema$GridData, AddBookmarkSuccess>(payload => ({
          type: BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
          payload
        })),
        takeUntil(action$.pipe(ofType(BookmarkActionTypes.REMOVE_BOOKMARK)))
      )
    )
  );

const refetchBookmarkEpic: BrowsingHistoryEpic = action$ =>
  action$.pipe(
    ofType<Actions, RefetchBookmark>(BookmarkActionTypes.REFETCH_BOOKMARK),
    mergeMap(({ payload }) =>
      getGridData$({ comicID: payload }).pipe(
        map<Schema$GridData, RefetchBookmarkSuccess>(payload => ({
          type: BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS,
          payload
        }))
      )
    )
  );

const saveBookmarkEpic: BrowsingHistoryEpic = (action$, state$) =>
  action$.pipe(
    ofType<Actions>(
      BookmarkActionTypes.ADD_BOOKMARK,
      BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
      BookmarkActionTypes.REMOVE_BOOKMARK,
      BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS
    ),
    switchMap(() => {
      writeFileSync(BOOKMARK_DIRECTORY, state$.value.bookmark.bookmark);
      return empty();
    })
  );

export default [addBookmarkEpic, refetchBookmarkEpic, saveBookmarkEpic];
