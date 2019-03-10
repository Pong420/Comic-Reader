import { from, of } from 'rxjs';
import { map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AxiosError } from 'axios';
import { getComicDataAPI } from '../../apis';
import {
  ComicActions,
  ComicActionTypes,
  GetComic,
  getComicSuccess
} from '../actions/comic';

// TODO:
// Handle error

const getComicEpic: Epic<ComicActions> = action$ =>
  action$.pipe(
    ofType<ComicActions, GetComic>(ComicActionTypes.GET_COMIC),
    mergeMap(action =>
      from(getComicDataAPI(action.payload)).pipe(
        map(getComicSuccess),
        catchError((error: AxiosError) =>
          of<ComicActions>({
            type: ComicActionTypes.GET_COMIC_FAIL,
            payload: error
          })
        ),
        takeUntil(action$.pipe(ofType(ComicActionTypes.GET_COMIC_CANCELED)))
      )
    )
  );

export default [getComicEpic];
