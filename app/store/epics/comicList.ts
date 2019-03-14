import { from, of } from 'rxjs';
import { map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicListAPI } from '../../apis';
import {
  ComicListActions,
  ComicListActionTypes,
  GetComicList,
  getComicsListSuccess
} from '../actions/comicList';
import { NO_OF_COMIC_ITEM_RETURN as length } from '../reducers/comicList';
import { ApiError } from '../../../typing';

const getComicListEpic: Epic<ComicListActions> = action$ =>
  action$.pipe(
    ofType<ComicListActions, GetComicList>(
      ComicListActionTypes.GET_COMICS_LIST
    ),
    mergeMap(action =>
      from(getComicListAPI(action.payload)).pipe(
        map(comicList =>
          getComicsListSuccess({
            comicList,
            from: (action.payload.page - 1) * length,
            to: action.payload.page * length
          })
        ),
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
