import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookMarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { SidebarIcon } from '../Sidebar/SidebarIcon';
import BookmarkActions, { BookmarkActionCreator } from '../../actions/bookmark';
import { BookmarkState } from '../../reducers/bookmark';

export interface BookmarkBtnProps extends BookmarkState, BookmarkActionCreator {
  comicID?: string;
}

function mapStateToProps({ bookmark }, ownProps) {
  return {
    ...bookmark,
    ...ownProps
  };
}

function mapActionToProps(dispatch) {
  return bindActionCreators(BookmarkActions, dispatch);
}

export const BookmarkBtn = connect(
  mapStateToProps,
  mapActionToProps
)(({ bookmarked, comicID, addBookmark, removeBookmark }: BookmarkBtnProps) => {
  const isBookmarked = !!bookmarked[comicID];

  return (
    <SidebarIcon
      Icon={isBookmarked ? BookMarkIcon : BookmarkBorderIcon}
      onClick={() =>
        isBookmarked ? removeBookmark(comicID) : addBookmark(comicID)
      }
    />
  );
});
