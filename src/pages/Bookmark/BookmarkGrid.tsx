import React from 'react';
import { useSelector } from 'react-redux';
import { SelectableGrid, GridPorps } from '../../components/Grid';
import {
  bookmarkSelector,
  bookmarkSelectedSelector,
  useBookmarkSelection
} from '../../store';
import { PATHS } from '../../constants';

interface Props extends GridPorps {}

export function BookmarkGrid({ comicID, ...props }: Props) {
  const data = useSelector(bookmarkSelector(comicID)) || {};

  const { toggleSelection } = useBookmarkSelection();

  const { selected, selectable } = useSelector(
    bookmarkSelectedSelector(comicID!)
  );

  return (
    <SelectableGrid
      className="bookmark-grid"
      comicID={comicID}
      selected={selected}
      selectable={selectable}
      onSelect={toggleSelection}
      prevPath={PATHS.BOOKMARK}
      subtitleType="author"
      {...props}
      {...data}
    />
  );
}
