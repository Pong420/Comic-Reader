import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAsync } from '../utils/useAsync';
import { Content } from '../components/Content';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getContentData } from '../api';
import { GetContentDataParam, ContentData } from '../../typing';

interface MatchParam extends GetContentDataParam {
  pageNo: string;
}

export function ContentPage({ match }: RouteComponentProps<MatchParam>) {
  const { pageNo, chapterID, comicID } = match.params;
  const { data, error, isLoading, reload } = useAsync<ContentData>({
    deferFn: () => getContentData({ comicID, chapterID })
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error {...error} reload={reload} />;
  }

  if (data) {
    return <Content {...data} pageNo={pageNo} />;
  }

  return null;
}
