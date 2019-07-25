import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SelectionSidebar } from '../Sidebar/SelectionSidebar';
import { RootState, BookmarkActionCreators } from '../../store';

const mapStateToProps = (state: RootState) => ({
  selectable: state.bookmark.selectable,
  selectedAll: state.bookmark.selection.length === state.bookmark.ids.length
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(BookmarkActionCreators, dispatch);

export function BookmarkSidebarComponent({
  selectable,
  selectedAll,
  toggleBookmarkSelectAll,
  toggleBookmarkSelectable,
  removeBookmark
}: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>) {
  return (
    <SelectionSidebar
      selectable={selectable}
      selectedAll={selectedAll}
      toggleSelectable={toggleBookmarkSelectable}
      toggleSelectAll={toggleBookmarkSelectAll}
      onRemove={removeBookmark}
    />
  );
}

export const BookmarkSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkSidebarComponent);
