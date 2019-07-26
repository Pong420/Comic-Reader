import { from, of, race } from 'rxjs';
import {
  map,
  concatMap,
  catchError,
  withLatestFrom,
  take
} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicListAPI } from '../../apis';
import {
  ComicsActions,
  ComicsActionTypes,
  GetComicsSuccess,
  GetComicsFailure,
  GetComics
} from '../actions/comics';
import { RootState } from '../reducers';
import { Schema$ComicItem } from '../../typings';

type Actions = ComicsActions;
type ComicsEpic = Epic<Actions, Actions, RootState>;

const getComicsEpic: ComicsEpic = (action$, state$) => {
  const param$ = state$.pipe(
    map(({ comics: { page, filter } }) => ({ page, filter }))
  );

  return action$.pipe(
    ofType(ComicsActionTypes.GET_COMICS, ComicsActionTypes.GET_MORE_COMICS),
    withLatestFrom(param$),
    concatMap(([action, params]) =>
      race(
        from(getComicListAPI(params)).pipe(
          map<Schema$ComicItem[], GetComicsSuccess>(comicList => ({
            type: ComicsActionTypes.GET_COMICS_SUCCESS,
            payload: comicList
          })),
          catchError(() =>
            of<GetComicsFailure>({
              type: ComicsActionTypes.GET_COMICS_FAILURE,
              payload: []
            })
          )
        ),
        action$.pipe(
          ofType<Actions, GetComics>(ComicsActionTypes.GET_COMICS),
          take(1)
        )
      )
    )
  );
};

export default [getComicsEpic];
