import { from, of } from 'rxjs';
import { map, catchError, takeUntil, switchMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicDataAPI } from '../../apis';
import { ComicActions, ComicActionTypes, GetComic, GetComicSuccess } from '../actions/comic';
import { ApiError, ComicData } from '../../typings';

const getComicEpic: Epic<ComicActions> = action$ =>
  action$.pipe(
    ofType<ComicActions, GetComic>(ComicActionTypes.GET_COMIC),
    switchMap(action =>
      from(getComicDataAPI(action.payload)).pipe(
        map<ComicData, GetComicSuccess>(comicData => ({
          type: ComicActionTypes.GET_COMIC_SUCCESS,
          payload: comicData
        })),
        catchError((error: ApiError) =>
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
