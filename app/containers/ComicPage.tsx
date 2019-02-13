import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAsync } from '../utils/useAsync';
import { Comic } from '../components/Comic';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getComicData } from '../api';
import { ComicData } from '../../typing';

export function ComicPage({ match }: RouteComponentProps) {
  const { data, error, isLoading, reload } = useAsync<ComicData>({
    deferFn: () => getComicData({ ...match.params })
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error {...error} reload={reload} />;
  }

  if (data) {
    return <Comic {...data} />;
  }

  return null;
}
