import { from, of } from 'rxjs';
import { map, catchError, concatMap, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getSearchResultsAPI } from '../../apis';
import {
  SearchResultActions,
  SearchResultActionTypes,
  GetSearchResultSuccess,
  GetSearchResultFailure
} from '../actions/searchResults';
import { Response$SearchResult } from '../../typings';
import { RootState } from '../reducers';

type Actions = SearchResultActions;
type SearchResultEpic = Epic<Actions, Actions, RootState>;

const getSearchResultEpic: SearchResultEpic = (action$, state$) => {
  return action$.pipe(
    ofType(
      SearchResultActionTypes.GET_SEARCH_RESULTS,
      SearchResultActionTypes.GET_MORE_SEARCH_RESULTS
    ),
    concatMap(() => {
      const { keyword, page } = state$.value.searchResults;
      return from(getSearchResultsAPI({ keyword, page })).pipe(
        map<Response$SearchResult, GetSearchResultSuccess>(payload => ({
          type: SearchResultActionTypes.GET_SEARCH_RESULT_SUCCESS,
          payload
        })),
        catchError(() =>
          of<GetSearchResultFailure>({
            type: SearchResultActionTypes.GET_SEARCH_RESULT_FAILURE,
            payload: {
              byIds: {},
              ids: []
            }
          })
        ),
        takeUntil(
          action$.pipe(ofType(SearchResultActionTypes.GET_SEARCH_RESULTS))
        )
      );
    })
  );
};

export default [getSearchResultEpic];
