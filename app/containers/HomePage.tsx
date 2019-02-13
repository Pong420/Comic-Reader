import React from 'react';
import { useAsync } from '../utils/useAsync';
import { Home } from '../components/Home';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getLatestUpdate } from '../api';
import { ComicItemList } from '../../typing';

export function HomePage() {
  const { data, error, isLoading, reload } = useAsync<ComicItemList>({
    deferFn: () => getLatestUpdate()
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error {...error} reload={reload} />;
  }

  if (data) {
    return <Home comicList={data} />;
  }

  return null;
}
