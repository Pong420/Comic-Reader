import { from, of } from 'rxjs';
import { map, catchError, takeUntil, delay, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AxiosError } from 'axios';
import { getComicListAPI } from '../../apis';
import {
  ComicListActions,
  ComicListTypes,
  GetComicList,
  addComics
} from '../actions/comicList';
import { ComicItemList } from '../../../typing';

const placeholders: ComicItemList = new Array(42).fill({});

const getComicListEpic: Epic<ComicListActions, ComicListActions> = action$ =>
  action$.pipe(
    ofType<ComicListActions, GetComicList>(ComicListTypes.GET_COMICS_LIST),
    mergeMap(action =>
      from(getComicListAPI(action.payload)).pipe(
        delay(5000),
        map(comicList =>
          addComics({
            comicList,
            page: 1
          })
        ),
        catchError((error: AxiosError) =>
          of<ComicListActions>({
            type: ComicListTypes.GET_COMICS_LIST_FAILED,
            payload: error
          })
        ),
        takeUntil(action$.pipe(ofType(ComicListTypes.GET_COMICS_LIST_CANCELED)))
      )
    )
  );

const placeholderEpic: Epic<ComicListActions, ComicListActions> = action$ =>
  action$.pipe(
    ofType<ComicListActions, GetComicList>(ComicListTypes.GET_COMICS_LIST),
    mergeMap(() =>
      of<ComicListActions>({
        type: ComicListTypes.ADD_COMICS_LIST_PLACE_HOLDER,
        payload: {
          comicList: placeholders
        }
      })
    )
  );

export default [getComicListEpic, placeholderEpic];
