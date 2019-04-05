import { from, of } from 'rxjs';
import { map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getContentDataAPI } from '../../apis';
import {
  ContentActions,
  ContentActionTypes,
  GetContent,
  GetContentSuccess
} from '../actions/content';
import { ApiError, ContentData } from '../../typings';

const getContentEpic: Epic<ContentActions> = action$ =>
  action$.pipe(
    ofType<ContentActions, GetContent>(ContentActionTypes.GET_CONTENT),
    mergeMap(action =>
      from(getContentDataAPI(action.payload)).pipe(
        map<ContentData, GetContentSuccess>(contentData => ({
          type: ContentActionTypes.GET_CONTENT_SUCCESS,
          payload: contentData
        })),
        catchError((error: ApiError) =>
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
