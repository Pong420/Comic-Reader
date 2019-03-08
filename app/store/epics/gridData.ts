import { from } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getGridDataAPI } from '../../apis';

// TODO: typing
export function createGridDataEpic(
  inputAction: string | string[],
  outputAction: string,
  cancelAction: string
): Epic {
  return action$ =>
    action$.pipe(
      ofType(inputAction),
      mergeMap(action =>
        from(
          getGridDataAPI({
            comicID: action.payload
          })
        ).pipe(
          map(gridData => ({
            type: outputAction,
            payload: {
              comicID: action.payload,
              gridData
            }
          })),
          takeUntil(action$.pipe(ofType(cancelAction)))
        )
      )
    );
}
