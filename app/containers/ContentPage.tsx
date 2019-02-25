import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { useAsync } from 'react-async';
import { AxiosError } from 'axios';
import { Content } from '../components/Content';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getContentDataAPI } from '../apis';
import { GetContentDataParam } from '../../typing';
import ContentActionCreator, { ContentActions } from '../actions/content';

interface MatchParam extends GetContentDataParam {
  pageNo: string;
}

export interface ContentPageProps
  extends RouteComponentProps<MatchParam>,
    ContentActions {}

function mapActionToProps(dispath) {
  return bindActionCreators(ContentActionCreator, dispath);
}

export const ContentPage = connect(
  null,
  mapActionToProps
)(({ match, setTotoalPage }: ContentPageProps) => {
  const { pageNo, chapterID, comicID } = match.params;
  const { data, error, isLoading, reload, run } = useAsync({
    deferFn: ([{ comicID, chapterID }]: GetContentDataParam[]) => {
      return getContentDataAPI({ comicID, chapterID });
    }
  });

  useEffect(() => {
    run({ comicID, chapterID }).then(({ images }) => {
      setTotoalPage(images.length);
    });
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
});
