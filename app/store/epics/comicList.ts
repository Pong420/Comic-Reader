import { from, of } from 'rxjs';
import { map, catchError, takeUntil, delay, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AxiosError } from 'axios';
import { getComicListAPI } from '../../apis';
import {
  ComicListActions,
  ComicListTypes,
  GetComicList,
  getComicsListSuccess
} from '../actions/comicList';
import { ComicItemList } from '../../../typing';

const placeholders: ComicItemList = new Array(42).fill({});
const { length } = placeholders;

// TODO:
// Remove delay
// Handle error
const getComicListEpic: Epic<ComicListActions> = action$ =>
  action$.pipe(
    ofType<ComicListActions, GetComicList>(ComicListTypes.GET_COMICS_LIST),
    mergeMap(action =>
      from(getComicListAPI(action.payload)).pipe(
        delay(5000),
        map(comicList =>
          getComicsListSuccess({
            comicList,
            from: (action.payload.page - 1) * length,
            to: action.payload.page * length
          })
        ),
        catchError((error: AxiosError) =>
          of<ComicListActions>({
            type: ComicListTypes.GET_COMICS_LIST_FAIL,
            payload: error
          })
        ),
        takeUntil(action$.pipe(ofType(ComicListTypes.GET_COMICS_LIST_CANCELED)))
      )
    )
  );

export default [getComicListEpic];
