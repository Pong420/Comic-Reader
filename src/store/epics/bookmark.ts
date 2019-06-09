import { from, empty } from 'rxjs';
import {
  map,
  switchMap,
  groupBy,
  mergeMap,
  debounceTime
} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BookmarkActions,
  BookmarkActionTypes,
  AddBookmark,
  AddBookmarkSuccess,
  RemoveBookmark
} from '../actions/bookmark';
import { RootState } from '../reducers';
import { getGridDataAPI } from '../../apis';
import { Schema$GridData, Param$GridData } from '../../typings';
import { BOOKMARK_DIRECTORY } from '../../constants';
import { writeFileSync } from '../../utils/writeFileSync';
import { RouterAction } from 'connected-react-router';

type Actions = BookmarkActions | RouterAction;
type BrowsingHistroyEpic = Epic<Actions, Actions, RootState>;

const getGridData$ = (params: Param$GridData) => from(getGridDataAPI(params));

const addOrRemoveBookmarkEpic: BrowsingHistroyEpic = action$ =>
  action$.pipe(
    ofType<Actions, AddBookmark | RemoveBookmark>(
      BookmarkActionTypes.ADD_BOOKMARK,
      BookmarkActionTypes.REMOVE_BOOKMARK
    ),
    groupBy(action => action.payload),
    mergeMap(group$ => {
      return group$.pipe(
        debounceTime(1000),
        switchMap(({ payload, type }) => {
          if (type === BookmarkActionTypes.REMOVE_BOOKMARK) {
            return empty();
          }

          return getGridData$({ comicID: payload }).pipe(
            map<Schema$GridData, AddBookmarkSuccess>(payload => ({
              type: BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
              payload
            }))
          );
        })
      );
    })
  );

// const refetchBookmarkEpic: BrowsingHistroyEpic = action$ =>
//   action$.pipe(
//     ofType<BookmarkActions, RefetchBookmark>(
//       BookmarkActionTypes.REFETCH_BOOKMARK
//     ),
//     mergeMap(action =>
//       getGridData$(action.payload.comicID).pipe(
//         map<Schema$GridData, RefetchBookmarkSuccess>(gridData => ({
//           type: BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS,
//           payload: {
//             gridData,
//             ...action.payload
//           }
//         }))
//       )
//     )
//   );

const saveBookmarkEpic: BrowsingHistroyEpic = (action$, state$) =>
  action$.pipe(
    ofType<Actions>(
      BookmarkActionTypes.ADD_BOOKMARK,
      BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
      BookmarkActionTypes.REMOVE_BOOKMARK,
      BookmarkActionTypes.REMOVE_ALL_BOOKMARK,
      BookmarkActionTypes.REFETCH_BOOKMARK_SUCCESS
    ),
    switchMap(() => {
      // writeFileSync(BOOKMARK_DIRECTORY, state$.value.bookmark.bookmark);
      return empty();
    })
  );

export default [
  addOrRemoveBookmarkEpic,
  // refetchBookmarkEpic,
  saveBookmarkEpic
];
