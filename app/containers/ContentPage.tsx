import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Content } from '../components/Content';
import { ContentActionCreators, BrowsingHistoryActionCreators } from '../store';

interface MatchParam {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      ...ContentActionCreators,
      ...BrowsingHistoryActionCreators
    },
    dispatch
  );
}

const ContentPageComponent = ({
  match,
  getContent,
  cancelGetContent,
  addBrowsingHistory
}: RouteComponentProps<MatchParam> &
  typeof ContentActionCreators &
  typeof BrowsingHistoryActionCreators) => {
  const { comicID, chapterID } = match.params;

  useEffect(() => {
    (async () => {
      await getContent({ comicID, chapterID });

      addBrowsingHistory({
        comicID,
        chapterID
      });
    })();

    return () => {
      cancelGetContent();
    };
  }, [chapterID, comicID]);

  return <Content />;
};

export const ContentPage = connect(
  null,
  mapDispatchToProps
)(ContentPageComponent);
