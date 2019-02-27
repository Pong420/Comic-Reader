import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SidebarWithRemoveFn } from '../../Sidebar/SidebarWithRemoveFn';
import { RootState } from '../../../reducers';
import { BookmarkState } from '../../../reducers/bookmark';
import BookmarkActionCreator, {
  BookmarkActions
} from '../../../actions/bookmark';

function mapStateToProps({ bookmark }: RootState, ownProps: any) {
  return { ...bookmark, ...ownProps };
}

function mapActiontoProps(dispatch: Dispatch) {
  return bindActionCreators(BookmarkActionCreator, dispatch);
}

export function BookmarkSidebarComponent({
  toogleRemovable,
  removeAllBookmark
}: BookmarkState & BookmarkActions) {
  return (
    <SidebarWithRemoveFn
      onToggleOnOff={on => toogleRemovable(on)}
      onRemoveAll={removeAllBookmark}
    />
  );
}

export const BookmarkSidebar = connect(
  mapStateToProps,
  mapActiontoProps
)(BookmarkSidebarComponent);
