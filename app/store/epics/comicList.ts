import { from, of } from 'rxjs';
import { map, catchError, mergeMap, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AxiosError } from 'axios';
import { getComicListAPI } from '../../apis';
import {
  ComicListActions,
  ComicListTypes,
  GetComicList,
  setComics
} from '../actions/comicList';
// import { ComicItemList } from '../../../typing';

// const placeholders: ComicItemList = new Array(42).fill({});

const getComicListEpic: Epic<ComicListActions> = action$ =>
  action$.pipe(
    ofType<ComicListActions, GetComicList>(ComicListTypes.GET_COMICS_LIST),
    mergeMap(action =>
      from(getComicListAPI(action.payload)).pipe(
        map(setComics),
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

export default [getComicListEpic];
