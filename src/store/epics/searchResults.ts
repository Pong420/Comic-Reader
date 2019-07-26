import { from, of, race } from 'rxjs';
import { map, catchError, concatMap, take } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getSearchResultsAPI } from '../../apis';
import {
  SearchResultActions,
  SearchResultActionTypes,
  GetSearchResults,
  GetSearchResultSuccess,
  GetSearchResultFailure,
  GetMoreSearchResults
} from '../actions/searchResults';
import { Response$SearchResult } from '../../typings';
import { RootState } from '../reducers';

type Actions = SearchResultActions;
type SearchResultEpic = Epic<Actions, Actions, RootState>;

const getSearchResultEpic: SearchResultEpic = (action$, state$) => {
  return action$.pipe(
    ofType<Actions, GetSearchResults | GetMoreSearchResults>(
      SearchResultActionTypes.GET_SEARCH_RESULTS,
      SearchResultActionTypes.GET_MORE_SEARCH_RESULTS
    ),
    concatMap(() => {
      const { keyword, page } = state$.value.searchResults;
      return race(
        from(getSearchResultsAPI({ keyword, page })).pipe(
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
          )
        ),
        action$.pipe(
          ofType(SearchResultActionTypes.GET_SEARCH_RESULTS),
          take(1)
        )
      );
    })
  );
};

export default [getSearchResultEpic];
