import { useEffect } from 'react';
import * as Async from 'react-async';
import { AxiosError } from 'axios';

export interface useAsyncOptions<T> {
  deferFn: (args?: any) => Promise<T>;
}

export function useAsync<T>(options: useAsyncOptions<T>) {
  const state = Async.useAsync(options);
  const { error, run, cancel } = state;

  useEffect(() => {
    run();

    return () => cancel();
  }, []);

  return {
    ...state,
    error: error as AxiosError
  };
}
