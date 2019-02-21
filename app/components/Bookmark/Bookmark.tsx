import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
import { Grid } from '../../components/Grid';
import { BookmarkState } from '../../reducers/bookmark';
import BookmarkActionCreator, { BookmarkActions } from '../../actions/bookmark';

export interface BookmarkProps extends BookmarkState, BookmarkActions {}

function mapStateToProps({ bookmark }, ownProps) {
  return { ...bookmark, ...ownProps };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BookmarkActionCreator, dispatch);
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
            onGridRender={props => <Grid {...props[1]} />}
          />
        )}
      </AutoSizer>
    </Layout>
  );
});
