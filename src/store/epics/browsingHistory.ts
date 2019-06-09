import { from, empty } from 'rxjs';
import { map, switchMap, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes,
  AddBrowsingHistorySuccess,
  RefetchBrowsingHistory,
  RefetchBrowsingHistorySuccess
} from '../actions/browsingHistory';
import {
  ContentActionTypes,
  GetContent,
  ContentActions
} from '../actions/content';
import { RootState } from '../reducers';
import { getGridDataAPI } from '../../apis';
import { Schema$GridData, Param$GridData } from '../../typings';
import { BROWSING_HISTORY_DIRECTORY } from '../../constants';
import { writeFileSync } from '../../utils/writeFileSync';

type Actions = BrowsingHistoryActions | ContentActions;
type BrowsingHistroyEpic = Epic<Actions, Actions, RootState>;

const getGridData$ = (params: Param$GridData) => from(getGridDataAPI(params));

const addBrowsingHistoryEpic: BrowsingHistroyEpic = action$ =>
  action$.pipe(
    ofType<Actions, GetContent>(ContentActionTypes.GET_CONTENT),
    switchMap(action => {
      return getGridData$(action.payload).pipe(
        map<Schema$GridData, AddBrowsingHistorySuccess>(payload => ({
          type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS,
          payload
        })),
        takeUntil(action$.pipe(ofType(ContentActionTypes.GET_CONTENT_CANCELED)))
      );
    })
  );

const refetchBrowsingHistoryEpic: BrowsingHistroyEpic = action$ =>
  action$.pipe(
    ofType<Actions, RefetchBrowsingHistory>(
      BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY
    ),
    mergeMap(action =>
      getGridData$({ comicID: action.payload }).pipe(
        map<Schema$GridData, RefetchBrowsingHistorySuccess>(payload => ({
          type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS,
          payload
        }))
      )
    )
  );

const saveBrowsingHistoryEpic: BrowsingHistroyEpic = (action$, state$) =>
  action$.pipe(
    ofType<Actions>(
      ContentActionTypes.GET_CONTENT,
      BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS,
      BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS
    ),
    switchMap(() => {
      writeFileSync(
        BROWSING_HISTORY_DIRECTORY,
        state$.value.browsingHistory.browsingHistory
      );
      return empty();
    })
  );

export default [
  addBrowsingHistoryEpic,
  refetchBrowsingHistoryEpic,
  saveBrowsingHistoryEpic
];
