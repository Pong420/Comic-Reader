import { from } from 'rxjs';
import { map, mergeMap, mapTo, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes,
  AddBrowsingHistory,
  AddBrowsingHistorySuccess,
  RefetchBrowsingHistory,
  RefetchBrowsingHistorySuccess
} from '../actions/browsingHistory';
import {
  ContentActions,
  ContentActionTypes,
  CacnelGetContent
} from '../actions/content';
import { getGridDataAPI } from '../../apis';
import { GridData } from '../../../typing';

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
            ofType<CombinedActions, CacnelGetContent>(
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

const saveBrowsingHistoryEpic: Epic<BrowsingHistoryActions> = action$ =>
  action$.pipe(
    ofType<BrowsingHistoryActions>(
      BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS,
      BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS
    ),
    mapTo<BrowsingHistoryActions, BrowsingHistoryActions>({
      type: BrowsingHistoryActionTypes.SAVE_BROWSING_HISTORY
    })
  );

export default [
  addBrowsingHistoryEpic,
  refetchBrowsingHistoryEpic,
  saveBrowsingHistoryEpic
];
