import { from, of } from 'rxjs';
import { map, catchError, takeUntil, concatMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicListAPI } from '../../apis';
import {
  ComicListActions,
  ComicListActionTypes,
  GetComicList,
  GetComicListSuccess
} from '../actions/comicList';
import { ComicItemList, ApiError } from '../../../typing';

const getComicListEpic: Epic<ComicListActions> = action$ =>
  action$.pipe(
    ofType<ComicListActions, GetComicList>(
      ComicListActionTypes.GET_COMICS_LIST
    ),
    concatMap(action =>
      from(getComicListAPI(action.payload)).pipe(
        map<ComicItemList, GetComicListSuccess>(comicList => ({
          type: ComicListActionTypes.GET_COMICS_LIST_SUCCESS,
          payload: comicList
        })),
        catchError((error: ApiError) =>
          of<ComicListActions>({
            type: ComicListActionTypes.GET_COMICS_LIST_FAIL,
            payload: error
          })
        ),
        takeUntil(
          action$.pipe(ofType(ComicListActionTypes.GET_COMICS_LIST_CANCELED))
        )
      )
    )
  );

export default [getComicListEpic];
