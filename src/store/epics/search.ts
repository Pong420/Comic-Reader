import { from, of } from 'rxjs';
import {
  map,
  catchError,
  takeUntil,
  withLatestFrom,
  concatMap
} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getSearchResultsAPI } from '../../apis';
import {
  SearchActions,
  SearchActionTypes,
  GetSearchResult,
  GetSearchResultSuccess,
  GetSearchResultFail,
  GetMoreSearchResult
} from '../actions/search';
import { Schema$SearchResult, ApiError } from '../../typings';
import { RootState } from '../reducers';

const getSearchResultEpic: Epic<SearchActions, SearchActions, RootState> = (
  action$,
  state$
) => {
  const param$ = state$.pipe(
    map(({ search }) => ({
      keyword: search.keyword,
      page: search.page
    }))
  );

  return action$.pipe(
    ofType<SearchActions, GetSearchResult | GetMoreSearchResult>(
      SearchActionTypes.GET_SEARCH_RESULT,
      SearchActionTypes.GET_MORE_SEARCH_RESULT
    ),
    withLatestFrom(param$),
    concatMap(([_, param]) =>
      from(getSearchResultsAPI(param)).pipe(
        map<Schema$SearchResult[], GetSearchResultSuccess>(payload => ({
          type: SearchActionTypes.GET_SEARCH_RESULT_SUCCESS,
          payload
        })),
        catchError((payload: ApiError) =>
          of<GetSearchResultFail>({
            type: SearchActionTypes.GET_SEARCH_RESULT_FAIL,
            payload
          })
        ),
        takeUntil(
          action$.pipe(ofType(SearchActionTypes.GET_SEARCH_RESULT_CANCELED))
        )
      )
    )
  );
};

export default [getSearchResultEpic];
