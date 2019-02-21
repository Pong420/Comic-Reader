import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';
import { ComicData } from '../../../typing';
import BrowsingHistoryActionCreator, {
  BrowsingHistoryActions
} from '../../actions/browsingHistory';

function mapStateToProps(_, ownProps) {
  return {
    ...ownProps
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BrowsingHistoryActionCreator, dispatch);
}

export const Comic = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    adultOnly,
    chapters,
    comicID,
    addBrowsingHistory,
    ...comicHeaderProps
  }: ComicData & BrowsingHistoryActions) => {
    useEffect(() => {
      addBrowsingHistory(comicID);
    }, []);

    return (
      <Layout className="comic">
        <ComicHeader {...comicHeaderProps} />
        <ComicChapters
          comicID={comicID}
          chapters={chapters}
          adultOnly={adultOnly}
        />
      </Layout>
    );
  }
);
