import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAsync } from 'react-async';
import { AxiosError } from 'axios';
import { Comic } from '../components/Comic';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getComicDataAPI } from '../apis';
import { ComicData, GetComicDataParam } from '../../typing';

// TODO:
// remove useAsync

interface MatchParam {
  comicID: string;
}

export function ComicPage({ match }: RouteComponentProps<MatchParam>) {
  const { data, error, isLoading, reload, run } = useAsync<ComicData>({
    deferFn: ([params]: GetComicDataParam[]) => getComicDataAPI(params)
  });

  useEffect(() => {
    run(match.params);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error {...error as AxiosError} reload={reload} />;
  }

  if (data) {
    return <Comic {...data} />;
  }

  return null;
}
