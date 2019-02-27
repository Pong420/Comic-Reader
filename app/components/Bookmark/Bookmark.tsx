import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
import { RemovableGrid, RefetchComicGrid } from '../../components/Grid';
import { BookmarkState } from '../../reducers/bookmark';
import BookmarkActionCreator, { BookmarkActions } from '../../actions/bookmark';

export interface BookmarkProps {}

// FIXME:
function mapStateToProps({ bookmark }: any, ownProps: any) {
  return { ...bookmark, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(BookmarkActionCreator, dispatch);
}

export const Bookmark = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    bookmarks,
    setBookmark,
    removeBookmark
  }: BookmarkProps & BookmarkState & BookmarkActions) => {
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
                    <RemovableGrid {...bookmarkItem} onClose={removeBookmark} />
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
);
