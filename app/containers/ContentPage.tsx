import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Content } from '../components/Content';
import { ContentActionCreators } from '../store';

interface MatchParam {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ContentActionCreators, dispatch);
}

const ContentPageComponent = ({
  match,
  getContent,
  cancelGetContent
}: RouteComponentProps<MatchParam> & typeof ContentActionCreators) => {
  const { comicID, chapterID } = match.params;

  useEffect(() => {
    getContent({ comicID, chapterID });

    return () => {
      cancelGetContent();
    };
  }, [cancelGetContent, chapterID, comicID, getContent]);

  return <Content />;
};

export const ContentPage = connect(
  null,
  mapDispatchToProps
)(ContentPageComponent);
