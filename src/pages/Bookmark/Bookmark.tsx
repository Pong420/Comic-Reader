import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { BookmarkGrid } from './BookmarkGrid';
import { GridContainer } from '../../components/GridContainer';
import { bookmarkIdsSelector } from '../../store';

export function Bookmark({ location }: RouteComponentProps) {
  const bookmarks = useSelector(bookmarkIdsSelector);

  return (
    <div className="bookmark">
      <GridContainer
        items={bookmarks}
        overscanRowCount={2}
        scrollPostionKey={location.pathname}
        onGridRender={id => <BookmarkGrid comicID={id} />}
      />
    </div>
  );
}
