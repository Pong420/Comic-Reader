import { from, empty, of } from 'rxjs';
import { map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { RouterAction, LOCATION_CHANGE } from 'connected-react-router';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes,
  AddBrowsingHistory,
  AddBrowsingHistorySuccess,
  RefetchBrowsingHistory,
  RefetchBrowsingHistorySuccess,
  ToggleBrowsingHistoryRemovable
} from '../actions/browsingHistory';
import {
  ContentActions,
  ContentActionTypes,
  GetContentCanceled
} from '../actions/content';
import { getGridDataAPI } from '../../apis';
import { GridData } from '../../typings';
import { RootState, browsingHistoryDirectory } from '../reducers';
import { writeFileSync } from '../../utils/writeFileSync';

const getGridData$ = (comicID: string) =>
  from(
    getGridDataAPI({
      comicID
    })
  );

type CombinedActions = BrowsingHistoryActions | ContentActions;

const addBrowsingHistoryEpic: Epic<CombinedActions> = action$ =>
  action$.pipe(
    ofType<CombinedActions, AddBrowsingHistory>(
      BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY
    ),
    mergeMap(action =>
      getGridData$(action.payload.comicID).pipe(
        map<GridData, AddBrowsingHistorySuccess>(gridData => ({
          type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS,
          payload: {
            gridData,
            ...action.payload
          }
        })),
        takeUntil(
          action$.pipe(
            ofType<CombinedActions, GetContentCanceled>(
              ContentActionTypes.GET_CONTENT_CANCELED
            )
          )
        )
      )
    )
  );

const refetchBrowsingHistoryEpic: Epic<BrowsingHistoryActions> = action$ =>
  action$.pipe(
    ofType<BrowsingHistoryActions, RefetchBrowsingHistory>(
      BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY
    ),
    mergeMap(action =>
      getGridData$(action.payload.comicID).pipe(
        map<GridData, RefetchBrowsingHistorySuccess>(gridData => ({
          type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS,
          payload: {
            gridData,
            ...action.payload
          }
        }))
      )
    )
  );

const saveBrowsingHistoryEpic: Epic<
  BrowsingHistoryActions,
  BrowsingHistoryActions,
  RootState
> = (action$, state$) =>
  action$.pipe(
    ofType<BrowsingHistoryActions>(
      BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS,
      BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS
    ),
    switchMap(() => {
      writeFileSync(
        browsingHistoryDirectory,
        state$.value.browsingHistory.browsingHistory
      );
      return empty();
    })
  );

const disableRemovableEpic: Epic<
  BrowsingHistoryActions | RouterAction,
  BrowsingHistoryActions | RouterAction,
  RootState
> = (action$, state$) =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    switchMap(() => {
      if (state$.value.browsingHistory.removable) {
        return of<ToggleBrowsingHistoryRemovable>({
          type: BrowsingHistoryActionTypes.TOGGLE_BROWSING_HISTORY_REMOVABLE
        });
      }

      return empty();
    })
  );

export default [
  addBrowsingHistoryEpic,
  refetchBrowsingHistoryEpic,
  saveBrowsingHistoryEpic,
  disableRemovableEpic
];
