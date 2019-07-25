import React from 'react';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { BookmarkGrid } from './BookmarkGrid';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.bookmark.ids
});

export function BookmarkComponent({
  bookmarks
}: ReturnType<typeof mapStateToProps>) {
  return (
    <div className="browsing-history">
      <AutoSizer>
        {dimen => (
          <GridContainer
            {...dimen}
            items={bookmarks}
            onGridRender={comicID => <BookmarkGrid comicID={comicID} />}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export const Bookmark = connect(mapStateToProps)(BookmarkComponent);
