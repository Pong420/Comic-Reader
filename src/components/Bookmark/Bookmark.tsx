import React from 'react';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { BookmarkGrid } from './BookmarkGrid';
import { RootState } from '../../store';
import { classes } from '../../utils/classes';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.bookmark.ids,
  selectable: state.bookmark.selectable
});

function BookmarkComponent({
  bookmarks,
  selectable
}: ReturnType<typeof mapStateToProps>) {
  return (
    <div className={classes('browsing-history', selectable && 'selectable')}>
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
