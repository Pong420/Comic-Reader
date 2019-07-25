import { from, empty, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes,
  AddBrowsingHistorySuccess,
  AddBrowsingHistoryFailure
} from '../actions/browsingHistory';
import {
  ContentActionTypes,
  GetContent,
  ContentActions
} from '../actions/content';
import { RootState } from '../reducers';
import { getGridDataAPI } from '../../apis';
import { Schema$GridData } from '../../typings';
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
        catchError(() =>
          of<AddBrowsingHistoryFailure>({
            type: BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY_FAILURE,
            payload: action.payload.comicID
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
      BrowsingHistoryActionTypes.UPDATE_BROWSING_HISTORY
    ),
    switchMap(() => {
      const { byIds, ids } = state$.value.browsingHistory;
      browsingHistoryStorage.save({ byIds, ids });
      return empty();
    })
  );

export default [addBrowsingHistoryEpic, saveBrowsingHistoryEpic];
