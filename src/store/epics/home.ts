import { from, of } from 'rxjs';
import {
  map,
  concatMap,
  catchError,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicListAPI } from '../../apis';
import {
  HomeActions,
  HomeActionTypes,
  GetComicListSuccess,
  GetComicListFail
} from '../actions/home';
import { RootState } from '../reducers';
import { Schema$ComicItem, ApiError } from '../../typings';

const getComicListEpic: Epic<HomeActions, HomeActions, RootState> = (
  action$,
  state$
) => {
  const param$ = state$.pipe(map(({ home }) => home.page));

  return action$.pipe(
    ofType(
      HomeActionTypes.GET_COMICS_LIST,
      HomeActionTypes.GET_MORE_COMICS_LIST
    ),
    withLatestFrom(param$),
    concatMap(([action, page]) =>
      from(getComicListAPI({ page })).pipe(
        map<Schema$ComicItem[], GetComicListSuccess>(comicList => ({
          type: HomeActionTypes.GET_COMICS_LIST_SUCCESS,
          payload: comicList
        })),
        catchError((error: ApiError) =>
          of<GetComicListFail>({
            type: HomeActionTypes.GET_COMICS_LIST_FAIL,
            payload: error
          })
        ),
        takeUntil(
          action$.pipe(ofType(HomeActionTypes.GET_COMICS_LIST_CANCELED))
        )
      )
    )
  );
};

export default [getComicListEpic];
