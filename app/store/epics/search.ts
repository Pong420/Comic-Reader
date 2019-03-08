import { from, of } from 'rxjs';
import { map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AxiosError } from 'axios';
import { getSearchResultsAPI } from '../../apis';
import {
  SearchActionTypes,
  SearchActions,
  GetSearchResults,
  getSearchResultsSuccess
} from '../actions/search';
import { searchResultPlaceholders } from '../reducers/search';

const { length } = searchResultPlaceholders;

// TODO:
// Handle error
const getSearchResultsEpic: Epic<SearchActions> = action$ =>
  action$.pipe(
    ofType<SearchActions, GetSearchResults>(
      SearchActionTypes.GET_SEARCH_RESULTS
    ),
    mergeMap(action =>
      from(getSearchResultsAPI(action.payload)).pipe(
        map(searchResults =>
          getSearchResultsSuccess({
            searchResults,
            from: (action.payload.page - 1) * length,
            to: action.payload.page * length
          })
        ),
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
