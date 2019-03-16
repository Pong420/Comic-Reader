import { from, of } from 'rxjs';
import { map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AxiosError } from 'axios';
import {
  SearchActionTypes,
  SearchActions,
  GetSearchResults,
  GetSearchResultsSuccess
} from '../actions/search';
import { SearchResults } from '../../../typing';
import { getSearchResultsAPI } from '../../apis';

const getSearchResultsEpic: Epic<SearchActions> = action$ =>
  action$.pipe(
    ofType<SearchActions, GetSearchResults>(
      SearchActionTypes.GET_SEARCH_RESULTS
    ),
    mergeMap(action =>
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
        ),
        takeUntil(
          action$.pipe(ofType(SearchActionTypes.GET_SEARCH_RESULTS_CANCELED))
        )
      )
    )
  );

export default [getSearchResultsEpic];
