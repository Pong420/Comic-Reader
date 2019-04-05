import React, { useMemo } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import BookMarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { SidebarIcon } from './Sidebar/SidebarIcon';
import { RootState, BookmarkState, BookmarkActionCreators } from '../store';

export interface BookmarkBtnProps {
  comicID: string;
}

function mapStateToProps({ bookmark }: RootState, ownProps: BookmarkBtnProps) {
  return { ...bookmark, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(BookmarkActionCreators, dispatch);
}

function BookmarkBtnComponent({
  bookmarks,
  comicID,
  addBookmark,
  removeBookmark
}: BookmarkBtnProps & BookmarkState & typeof BookmarkActionCreators) {
  const mappedBookmarks = useMemo(() => new Map(bookmarks), [bookmarks]);
  const bookmarked = mappedBookmarks.has(comicID);

  return (
    <SidebarIcon
      Icon={bookmarked ? BookMarkIcon : BookmarkBorderIcon}
      tooltip={bookmarked ? '取消收藏' : '加入收藏'}
      onClick={() => (bookmarked ? removeBookmark(comicID) : addBookmark(comicID))}
    />
  );
}

export const BookmarkBtn = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkBtnComponent);
