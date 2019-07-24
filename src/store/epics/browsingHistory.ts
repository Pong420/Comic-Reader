import { from, empty, of } from 'rxjs';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes,
  AddBrowsingHistorySuccess,
  AddBrowsingHistoryFailure,
  RefetchBrowsingHistory,
  RefetchBrowsingHistorySuccess,
  RefetchBrowsingHistoryFailure
} from '../actions/browsingHistory';
import {
  ContentActionTypes,
  GetContent,
  ContentActions
} from '../actions/content';
import { RootState } from '../reducers';
import { getGridDataAPI } from '../../apis';
import { Schema$GridData, ApiError } from '../../typings';
import { browsingHistoryStorage } from '../../storage/browsingHistory';

type Actions = BrowsingHistoryActions | ContentActions;
type BrowsingHistoryEpic = Epic<Actions, Actions, RootState>;

const addBrowsingHistoryEpic: BrowsingHistoryEpic = action$ =>
  action$.pipe(
    ofType<Actions, GetContent>(ContentActionTypes.GET_CONTENT),
    switchMap(action =>
      from(getGridDataAPI(action.payload)).pipe(
        map<Schema$GridData, AddBrowsingHistorySuccess>(payload => ({
          type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS,
          payload
        })),
        catchError((payload: ApiError) =>
          of<AddBrowsingHistoryFailure>({
            type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_FAILURE,
            payload
          })
        )
      )
    )
  );

const refetchBrowsingHistoryEpic: BrowsingHistoryEpic = action$ =>
  action$.pipe(
    ofType<Actions, RefetchBrowsingHistory>(
      BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY
    ),
    mergeMap(action =>
      from(getGridDataAPI({ comicID: action.payload })).pipe(
        map<Schema$GridData, RefetchBrowsingHistorySuccess>(payload => ({
          type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS,
          payload
        })),
        catchError((payload: ApiError) =>
          of<RefetchBrowsingHistoryFailure>({
            type: BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_FAILURE,
            payload
          })
        )
      )
    )
  );

const saveBrowsingHistoryEpic: BrowsingHistoryEpic = (action$, state$) =>
  action$.pipe(
    ofType<Actions>(
      ContentActionTypes.GET_CONTENT,
      BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_SUCCESS,
      BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS
    ),
    switchMap(() => {
      const { byIds, ids } = state$.value.browsingHistory;
      browsingHistoryStorage.save({ byIds, ids });
      return empty();
    })
  );

export default [
  addBrowsingHistoryEpic,
  refetchBrowsingHistoryEpic,
  saveBrowsingHistoryEpic
];
