import { RouterAction } from 'connected-react-router';
import { from, empty, of } from 'rxjs';
import {
  map,
  switchMap,
  mergeMap,
  takeUntil,
  catchError
} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BookmarkActions,
  BookmarkActionTypes,
  AddBookmark,
  AddBookmarkSuccess,
  AddBookmarkFailure,
  RefetchBookmark,
  RefetchBookmarkSuccess,
  RefetchBookmarkFailure
} from '../actions/bookmark';
import { RootState } from '../reducers';
import { getGridDataAPI } from '../../apis';
import { Schema$GridData } from '../../typings';
import { bookmarkStorage } from '../../storage/bookmark';

type Actions = BookmarkActions | RouterAction;
type BookmarkEpic = Epic<Actions, Actions, RootState>;

const addBookmarkEpic: BookmarkEpic = action$ =>
  action$.pipe(
    ofType<Actions, AddBookmark>(BookmarkActionTypes.ADD_BOOKMARK),
    switchMap(action =>
      from(getGridDataAPI({ comicID: action.payload })).pipe(
        map<Schema$GridData, AddBookmarkSuccess>(payload => ({
          type: BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
          payload
        })),
        catchError(() =>
          of<AddBookmarkFailure>({
            type: BookmarkActionTypes.ADD_BOOKMARK_FAILURE,
            payload: action.payload
          })
        ),
        takeUntil(action$.pipe(ofType(BookmarkActionTypes.REMOVE_BOOKMARK)))
      )
    )
  );

const refetchBookmarkEpic: BookmarkEpic = action$ =>
  action$.pipe(
    ofType<Actions, RefetchBookmark>(BookmarkActionTypes.REFETCH_BOOKMARK),
    mergeMap(action =>
      from(getGridDataAPI(action.payload)).pipe(
        map<Schema$GridData, RefetchBookmarkSuccess>(payload => ({
          type: BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS,
          payload
        })),
        catchError(() =>
          of<RefetchBookmarkFailure>({
            type: BookmarkActionTypes.REFETCH_BOOKMARK_FAILURE,
            payload: action.payload.comicID
          })
        )
      )
    )
  );

const saveBookmarkEpic: BookmarkEpic = (action$, state$) =>
  action$.pipe(
    ofType<Actions>(
      BookmarkActionTypes.ADD_BOOKMARK,
      BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
      BookmarkActionTypes.REMOVE_BOOKMARK,
      BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS
    ),
    switchMap(() => {
      const { byIds, ids } = state$.value.bookmark;
      bookmarkStorage.save({ byIds, ids });
      return empty();
    })
  );

export default [addBookmarkEpic, refetchBookmarkEpic, saveBookmarkEpic];
