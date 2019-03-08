// import { from, of } from 'rxjs';
// import { map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes
} from '../actions/browsingHistory';

// TODO:
// Handle error

const saveBrowsingHistoryEpic: Epic<BrowsingHistoryActions> = action$ =>
  action$.pipe(
    ofType<BrowsingHistoryActions>(
      BrowsingHistoryActionTypes.ADD_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REMOVE_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REMOVE_ALL_BROWSING_HISTORY,
      BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY
    ),
    ofType<BrowsingHistoryActions>(
      BrowsingHistoryActionTypes.SAVE_BROWSING_HISTORY
    )
  );

export default [saveBrowsingHistoryEpic];
