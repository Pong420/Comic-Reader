import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SidebarWithRemoveFn } from '../Sidebar/SidebarWithRemoveFn';
import { RootState, BookmarkState, BookmarkActionCreators } from '../../store';

function mapStateToProps({ bookmark }: RootState, ownProps: any) {
  return { ...bookmark, ...ownProps };
}

function mapActiontoProps(dispatch: Dispatch) {
  return bindActionCreators(BookmarkActionCreators, dispatch);
}

export function BookmarkSidebarComponent({
  removable,
  toggleBookmarkRemovable,
  removeAllBookmark
}: BookmarkState & typeof BookmarkActionCreators) {
  return <SidebarWithRemoveFn on={removable} onToggleOnOff={toggleBookmarkRemovable} onRemoveAll={removeAllBookmark} />;
}

export const BookmarkSidebar = connect(
  mapStateToProps,
  mapActiontoProps
)(BookmarkSidebarComponent);
