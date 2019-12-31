import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { SidebarIcon } from './Sidebar';
import { ReactComponent as BookmarkedIcon } from '../assets/bookmark-24px.svg';
import { ReactComponent as BookmarkIcon } from '../assets/bookmark_border-24px.svg';
import { bookmarkedSelector, useBookmarkActions } from '../store';
import { useRxAsync } from 'use-rx-hooks';
import { getGridData } from '../service';

interface Props {
  comicID: string;
}

export function BookmarkBtn({ comicID }: Props) {
  const bookmarked = useSelector(bookmarkedSelector(comicID));

  const {
    createBookmark,
    deleteBookmark,
    updateBookmark
  } = useBookmarkActions();

  const { run } = useRxAsync(getGridData, {
    defer: true,
    onSuccess: updateBookmark
  });

  const toggle = useCallback(() => {
    deleteBookmark({ comicID });

    if (!bookmarked) {
      createBookmark({ comicID });
      run({ comicID });
    }
  }, [bookmarked, comicID, createBookmark, deleteBookmark, run]);

  return (
    <SidebarIcon
      icon={bookmarked ? BookmarkedIcon : BookmarkIcon}
      onClick={toggle}
    />
  );
}
