import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import BookmarkActions from '../../actions/bookmark';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
// import { Grid } from '../../components/Grid';
import { Bookmarks } from '../../../typing';

export interface BookmarkProps {
  bookmarks: Bookmarks;
  setBookmark: (bookmarks: Bookmarks) => void;
}

function mapStateToProps({ bookmark }, ownProps) {
  return { ...bookmark, ...ownProps };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BookmarkActions, dispatch);
}

// TODO:
// No Content render
// Remove button

export const Bookmark = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ bookmarks }: BookmarkProps) => {
  return (
    <Layout className="bookmark">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={bookmarks}
            onGridRender={props => <div />}
          />
        )}
      </AutoSizer>
    </Layout>
  );
});
