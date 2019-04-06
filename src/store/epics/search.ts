import { from, of, race } from 'rxjs';
import { map, catchError, take, concatMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AxiosError } from 'axios';
import {
  SearchActionTypes,
  SearchActions,
  GetSearchResults,
  GetMoreSearchResults,
  GetSearchResultsSuccess
} from '../actions/search';
import { SearchResults } from '../../typings';
import { getSearchResultsAPI } from '../../apis';

const getSearchResultsEpic: Epic<SearchActions> = action$ =>
  action$.pipe(
    ofType<SearchActions, GetSearchResults | GetMoreSearchResults>(
      SearchActionTypes.GET_SEARCH_RESULTS,
      SearchActionTypes.GET_MORE_SEARCH_RESULTS
    ),
    concatMap(action =>
      race(
        from(getSearchResultsAPI(action.payload)).pipe(
          map<SearchResults, GetSearchResultsSuccess>(searchResults => ({
            type: SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS,
            payload: searchResults
          })),
          catchError((error: AxiosError) =>
            of<SearchActions>({
              type: SearchActionTypes.GET_SEARCH_RESULTS_FAIL,
              payload: error
            })
          )
        ),
        action$.pipe(
          ofType(SearchActionTypes.GET_SEARCH_RESULTS_CANCELED),
          take(1)
        )
      )
    )
  );

export default [getSearchResultsEpic];
