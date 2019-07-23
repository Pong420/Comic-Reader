import { from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicDataAPI } from '../../apis';
import {
  ComicDataActions,
  ComicDataActionTypes,
  GetComicData,
  GetComicDataSuccess,
  GetComicDataFailure
} from '../actions/comicData';
import { Schema$ComicData, ApiError } from '../../typings';

const getComicDataEpic: Epic<ComicDataActions> = action$ => {
  return action$.pipe(
    ofType<ComicDataActions, GetComicData>(ComicDataActionTypes.GET_COMIC_DATA),
    switchMap(action =>
      from(getComicDataAPI({ comicID: action.payload })).pipe(
        map<Schema$ComicData, GetComicDataSuccess>(payload => ({
          type: ComicDataActionTypes.GET_COMIC_DATA_SUCCESS,
          payload
        })),
        catchError((payload: ApiError) =>
          of<GetComicDataFailure>({
            type: ComicDataActionTypes.GET_COMIC_DATA_FAILURE,
            payload
          })
        )
      )
    )
  );
};

export default [getComicDataEpic];
