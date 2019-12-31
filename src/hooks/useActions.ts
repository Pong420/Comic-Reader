/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useRef } from 'react';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';

interface Actions {
  [k: string]: (...args: any[]) => AnyAction;
}

export function useActions<A extends Actions>(actions: A): A {
  const dispatch = useDispatch();
  const actionsRef = useRef(actions);

  return useMemo(() => {
    const handler: any = {};
    const actions = actionsRef.current;

    for (const key in actions) {
      const action = actions[key];
      handler[key] = (...args: Parameters<typeof action>) => {
        dispatch(action(...args));
      };
    }

    return handler as A;
  }, [dispatch]);
}
