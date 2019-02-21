import React, { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookMarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { SidebarIcon } from '../Sidebar/SidebarIcon';
import BookmarkActionCreator, { BookmarkActions } from '../../actions/bookmark';
import { BookmarkState } from '../../reducers/bookmark';

export interface BookmarkBtnProps extends BookmarkState, BookmarkActions {
  comicID?: string;
}

function mapStateToProps({ bookmark }, ownProps) {
  return {
    ...bookmark,
    ...ownProps
  };
}

function mapActionToProps(dispatch) {
  return bindActionCreators(BookmarkActionCreator, dispatch);
}

export const BookmarkBtn = connect(
  mapStateToProps,
  mapActionToProps
)(({ bookmarks, comicID, addBookmark, removeBookmark }: BookmarkBtnProps) => {
  const mappedBookmarks = useMemo(() => new Map(bookmarks), [bookmarks]);
  const bookmarked = mappedBookmarks.has(comicID);

  return (
    <SidebarIcon
      Icon={bookmarked ? BookMarkIcon : BookmarkBorderIcon}
      onClick={() =>
        bookmarked ? removeBookmark(comicID) : addBookmark(comicID)
      }
    />
  );
});
