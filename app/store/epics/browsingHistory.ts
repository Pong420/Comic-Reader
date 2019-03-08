import { ofType, Epic } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import {
  BrowsingHistoryActions,
  BrowsingHistoryActionTypes
} from '../actions/browsingHistory';
import { createGridDataEpic } from './gridData';

const refetchBookmarkEpic = createGridDataEpic(
  BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY,
  BrowsingHistoryActionTypes.REFETCH_BROWSING_HISTORY_SUCCESS,
  ''
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

export default [refetchBookmarkEpic, saveBrowsingHistoryEpic];
