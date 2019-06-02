import { from, of } from 'rxjs';
import { map, catchError, takeUntil, switchMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicDataAPI } from '../../apis';
import {
  ComicActions,
  ComicActionTypes,
  GetComic,
  GetComicSuccess,
  GetComicFail
} from '../actions/comic';
import { Schema$ComicData, ApiError } from '../../typings';

const getComicEpic: Epic<ComicActions> = action$ => {
  return action$.pipe(
    ofType<ComicActions, GetComic>(ComicActionTypes.GET_COMIC),
    switchMap(action =>
      from(getComicDataAPI({ comicID: action.payload })).pipe(
        map<Schema$ComicData, GetComicSuccess>(payload => ({
          type: ComicActionTypes.GET_COMIC_SUCCESS,
          payload
        })),
        catchError((payload: ApiError) =>
          of<GetComicFail>({
            type: ComicActionTypes.GET_COMIC_FAIL,
            payload
          })
        ),
        takeUntil(action$.pipe(ofType(ComicActionTypes.GET_COMIC_CANCELED)))
      )
    )
  );
};

export default [getComicEpic];
