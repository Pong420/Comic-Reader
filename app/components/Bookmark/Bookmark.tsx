import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
import { RemovableGrid, RefetchComicGrid } from '../../components/Grid';
import { RootState } from '../../reducers';
import { BookmarkState } from '../../reducers/bookmark';
import BookmarkActionCreator, { BookmarkActions } from '../../actions/bookmark';

export interface BookmarkProps {}

function mapStateToProps({ bookmark }: RootState, ownProps: any) {
  return { ...bookmark, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(BookmarkActionCreator, dispatch);
}

function BookmarkComponent({
  bookmarks,
  removable,
  setBookmark,
  removeBookmark
}: BookmarkProps & BookmarkState & BookmarkActions) {
  return (
    <Layout className="bookmark">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={bookmarks}
            onGridRender={([, { comicID, bookmarkItem }]) => {
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
                <RefetchComicGrid
                  comicID={comicID}
                  onFetch={bookmarkItem =>
                    setBookmark({
                      comicID,
                      bookmarkItem
                    })
                  }
                />
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
