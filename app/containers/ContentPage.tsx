import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAsync } from 'react-async';
import { AxiosError } from 'axios';
import { Content } from '../components/Content';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getContentData } from '../api';
import { GetContentDataParam } from '../../typing';

interface MatchParam extends GetContentDataParam {
  pageNo: string;
}

export function ContentPage({ match }: RouteComponentProps<MatchParam>) {
  const { pageNo, chapterID, comicID } = match.params;
  const { data, error, isLoading, reload, run } = useAsync({
    deferFn: ([{ comicID, chapterID }]: GetContentDataParam[]) => {
      return getContentData({ comicID, chapterID });
    }
  });

  useEffect(() => {
    run({ comicID, chapterID });
  }, [chapterID]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error {...error as AxiosError} reload={reload} />;
  }

  if (data) {
    return <Content {...data} pageNo={pageNo} />;
  }

  return null;
}
