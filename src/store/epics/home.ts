import { from, of } from 'rxjs';
import { map, catchError, takeUntil, concatMap, filter } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getComicListAPI } from '../../apis';
import {
  HomeActions,
  HomeActionTypes,
  GetComicList,
  GetMoreComicList,
  GetComicListSuccess
} from '../actions/home';
import { ComicItemList, ApiError } from '../../typings';

const getComicListEpic: Epic<HomeActions> = action$ =>
  action$.pipe(
    ofType<HomeActions, GetComicList | GetMoreComicList>(
      HomeActionTypes.GET_COMICS_LIST,
      HomeActionTypes.GET_MORE_COMICS_LIST
    ),
    concatMap(action =>
      from(getComicListAPI(action.payload)).pipe(
        map<ComicItemList, GetComicListSuccess>(comicList => ({
          type: HomeActionTypes.GET_COMICS_LIST_SUCCESS,
          payload: comicList
        })),
        catchError((error: ApiError) =>
          of<HomeActions>({
            type: HomeActionTypes.GET_COMICS_LIST_FAIL,
            payload: error
          })
        ),
        takeUntil(
          action$.pipe(ofType(HomeActionTypes.GET_COMICS_LIST_CANCELED))
        )
      )
    )
  );

export default [getComicListEpic];
