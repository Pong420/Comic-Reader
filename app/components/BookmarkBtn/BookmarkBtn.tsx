import React, { useMemo } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import BookMarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { SidebarIcon } from '../Sidebar/SidebarIcon';
import BookmarkActionCreator, { BookmarkActions } from '../../actions/bookmark';
import { BookmarkState } from '../../reducers/bookmark';

export interface BookmarkBtnProps {
  comicID: string;
}

// FIXME:
function mapStateToProps({ bookmark }: any, ownProps: any) {
  return { ...bookmark, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(BookmarkActionCreator, dispatch);
}

function BookmarkBtnComponent({
  bookmarks,
  comicID,
  addBookmark,
  removeBookmark
}: BookmarkBtnProps & BookmarkState & BookmarkActions) {
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
}

export const BookmarkBtn = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkBtnComponent);
