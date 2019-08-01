import React from 'react';
import { connect } from 'react-redux';
import { GridContainer } from '../GridContainer';
import { BookmarkGrid } from './BookmarkGrid';
import { RootState } from '../../store';
import { classes } from '../../utils/classes';
import { useDraggable } from '../../utils/useDraggable';

const mapStateToProps = (state: RootState) => ({
  bookmarks: state.bookmark.ids,
  selectable: state.bookmark.selectable
});

function BookmarkComponent({
  bookmarks,
  selectable
}: ReturnType<typeof mapStateToProps>) {
  const dragProps = useDraggable();

  return (
    <div className={classes('bookmark', selectable && 'selectable')}>
      <GridContainer
        scrollPostionKey="bookmark"
        items={bookmarks}
        onGridRender={comicID => (
          <BookmarkGrid {...dragProps} comicID={comicID} />
        )}
      />
    </div>
  );
}

export const Bookmark = connect(mapStateToProps)(BookmarkComponent);
