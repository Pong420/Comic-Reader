import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SelectionSidebar } from '../Sidebar/SelectionSidebar';
import { RootState, BookmarkActionCreators } from '../../store';

const mapStateToProps = ({ bookmark }: RootState) => ({
  ...bookmark
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(BookmarkActionCreators, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const BookmarkSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    seletable,
    selection,
    bookmark,
    removeBookmark,
    toggleBookmarkSelection,
    updateBookmarkSelection
  }: Props) => {
    const selectedAll = selection.length === bookmark.length;
    const toggleSelectAll = () =>
      updateBookmarkSelection(
        selectedAll ? [] : bookmark.map(([_, { comicID }]) => comicID)
      );

    const onRemove = () => removeBookmark(selection);

    return (
      <SelectionSidebar
        seletable={seletable}
        selectedAll={selectedAll}
        toggle={toggleBookmarkSelection}
        toggleSelectAll={toggleSelectAll}
        onRemove={onRemove}
      />
    );
  }
);
