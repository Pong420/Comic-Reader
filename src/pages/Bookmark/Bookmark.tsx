import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { BookmarkGrid } from './BookmarkGrid';
import { GridContainer } from '../../components/GridContainer';
import { bookmarkIdsSelector } from '../../store';
import { useDraggable } from '../../hooks/useDraggable';

export function Bookmark({ location }: RouteComponentProps) {
  const bookmarks = useSelector(bookmarkIdsSelector);
  const dragableProps = useDraggable();

  return (
    <div className="bookmark">
      <GridContainer
        items={bookmarks}
        overscanRowCount={2}
        scrollPostionKey={location.pathname}
        onGridRender={id => <BookmarkGrid {...dragableProps} comicID={id} />}
      />
    </div>
  );
}
