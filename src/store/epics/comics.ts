import { from, of } from 'rxjs';
import { map, concatMap, catchError, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicListAPI } from '../../apis';
import {
  ComicsActions,
  ComicsActionTypes,
  GetComicsSuccess,
  GetComicsFailure
} from '../actions/comics';
import { RootState } from '../reducers';
import { Schema$ComicItem } from '../../typings';

type Actions = ComicsActions;
type ComicsEpic = Epic<Actions, Actions, RootState>;

const getComicsEpic: ComicsEpic = (action$, state$) =>
  action$.pipe(
    ofType(ComicsActionTypes.GET_COMICS, ComicsActionTypes.GET_MORE_COMICS),
    concatMap(() => {
      const { page, filter } = state$.value.comics;
      return from(getComicListAPI({ page, filter })).pipe(
        map<Schema$ComicItem[], GetComicsSuccess>(comicList => ({
          type: ComicsActionTypes.GET_COMICS_SUCCESS,
          payload: comicList
        })),
        catchError(() =>
          of<GetComicsFailure>({
            type: ComicsActionTypes.GET_COMICS_FAILURE,
            payload: []
          })
        ),
        takeUntil(action$.pipe(ofType(ComicsActionTypes.GET_COMICS)))
      );
    })
  );

export default [getComicsEpic];
