import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
import { RemovableGrid, RefetchComicGrid } from '../../components/Grid';
import { RootState, BookmarkState, BookmarkActionCreators } from '../../store';

function mapStateToProps({ bookmark }: RootState, ownProps: any) {
  return { ...bookmark, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(BookmarkActionCreators, dispatch);
}

function BookmarkComponent({
  bookmarks,
  removable,
  refetchBookmark,
  removeBookmark
}: BookmarkState & typeof BookmarkActionCreators) {
  const reversedBookmarks = bookmarks.slice().reverse();

  return (
    <Layout className="bookmark">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={reversedBookmarks}
            onGridRender={([comicID, { bookmarkItem }]) => {
              if (bookmarkItem) {
                return (
                  <RemovableGrid
                    {...bookmarkItem}
                    removable={removable}
                    onRemove={removeBookmark}
                  />
                );
              }

              return (
                <RefetchComicGrid onFetch={() => refetchBookmark(comicID)} />
              );
            }}
          />
        )}
      </AutoSizer>
    </Layout>
  );
}

export const Bookmark = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkComponent);
