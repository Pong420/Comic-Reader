import { from } from 'rxjs';
import { map, mergeMap, mapTo } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes,
  AddBrowsingHistory,
  AddBrowsingHistorySuccess,
  RefetchBrowsingHistory,
  RefetchBrowsingHistorySuccess
} from '../actions/browsingHistory';
import { getGridDataAPI } from '../../apis';

const getGridData$ = (comicID: string) =>
  from(
    getGridDataAPI({
      comicID
    })
  );

const addBrowsingHistoryEpic: Epic<BrowsingHistoryActions> = action$ =>
  action$.pipe(
    ofType<BrowsingHistoryActions, AddBrowsingHistory>(
      BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY
    ),
    mergeMap(action =>
      getGridData$(action.payload.comicID).pipe(
        map(
          gridData =>
            ({
              type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS,
              payload: {
                gridData,
                ...action.payload
              }
            } as AddBrowsingHistorySuccess)
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
        map(
          gridData =>
            ({
              type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS,
              payload: {
                gridData,
                ...action.payload
              }
            } as RefetchBrowsingHistorySuccess)
        )
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
