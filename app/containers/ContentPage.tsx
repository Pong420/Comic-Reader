import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { useAsync } from 'react-async';
import { AxiosError } from 'axios';
import { Content } from '../components/Content';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getContentDataAPI } from '../apis';
import { GetContentDataParam, ContentData } from '../../typing';
import ContentActionCreator, { ContentActions } from '../actions/content';

interface MatchParam {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

function mapDispatchToProps(dispath: Dispatch) {
  return bindActionCreators(ContentActionCreator, dispath);
}

const ContentPageComponent = ({
  match,
  setTotoalPage
}: RouteComponentProps<MatchParam> & ContentActions) => {
  const { pageNo, chapterID, comicID } = match.params;

  const { data, error, isLoading, reload, run } = useAsync<ContentData>({
    deferFn: ([params]: GetContentDataParam[]) => getContentDataAPI(params)
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
};

export const ContentPage = connect(
  null,
  mapDispatchToProps
)(ContentPageComponent);
