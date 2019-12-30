import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

export function useSearchParam<T extends {}>() {
  const history = useHistory();
  const setSearchParam = useCallback(
    (payload: Partial<T> | ((params: Partial<T>) => Partial<T>)) => {
      const newState =
        typeof payload === 'function'
          ? payload(qs.parse(window.location.search.slice(1)) as T)
          : payload;

      for (const key in newState) {
        if (!newState[key]) {
          delete newState[key];
        }
      }
      history.push({ search: qs.stringify(newState) });
    },
    [history]
  );

  return { setSearchParam };
}
