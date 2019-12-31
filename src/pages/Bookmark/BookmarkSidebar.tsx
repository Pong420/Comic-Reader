import React from 'react';
import { batch } from 'react-redux';
import { SelectionSidebar } from '../../components/Sidebar';
import {
  useBookmarkSelection,
  useBookmarkActions,
  bookmarkSelectionSelector
} from '../../store';
import { useSelector } from 'react-redux';

export function BookmarkSidebar() {
  const state = useSelector(bookmarkSelectionSelector);
  const actions = useBookmarkSelection();
  const { deleteBookmark } = useBookmarkActions();

  return (
    <SelectionSidebar
      {...actions}
      {...state}
      onDelete={ids =>
        batch(() => ids.forEach(comicID => deleteBookmark({ comicID })))
      }
      className="bookmark-sidebar"
    />
  );
}
