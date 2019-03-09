import { from, of } from 'rxjs';
import { map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AxiosError } from 'axios';
import { getContentDataAPI } from '../../apis';
import {
  ContentActions,
  ContentActionTypes,
  GetContent,
  getContentSuccess
} from '../actions/content';

// TODO:
// Handle error

const getContentEpic: Epic<ContentActions> = action$ =>
  action$.pipe(
    ofType<ContentActions, GetContent>(ContentActionTypes.GET_CONTENT),
    mergeMap(action =>
      from(getContentDataAPI(action.payload)).pipe(
        map(getContentSuccess),
        catchError((error: AxiosError) =>
          of<ContentActions>({
            type: ContentActionTypes.GET_CONTENT_FAIL,
            payload: error
          })
        ),
        takeUntil(action$.pipe(ofType(ContentActionTypes.GET_CONTENT_CANCELED)))
      )
    )
  );

export default [getContentEpic];
