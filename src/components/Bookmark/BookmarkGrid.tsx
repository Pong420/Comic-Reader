import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { SelectableGrid } from '../Grid';
import {
  RootState,
  updateBookmark,
  updateBookmarkSelection
} from '../../store';

interface Props {
  comicID: string;
}

const mapStateToProps = (state: RootState, { comicID }: Props) => ({
  ...state.bookmark.byIds[comicID],
  selected: state.bookmark.selection.includes(comicID)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateBookmark, updateBookmarkSelection }, dispatch);

export function BookmarkGridComponent({
  updateBookmark,
  updateBookmarkSelection,
  ...props
}: Props &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>) {
  return (
    <SelectableGrid
      toggleSelect={updateBookmarkSelection}
      onRefetchSuccess={updateBookmark}
      {...props}
    />
  );
}

export const BookmarkGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkGridComponent);
