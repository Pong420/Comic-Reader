import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { SelectableGrid, SelectableGridProps } from '../Grid/SelectableGrid';
import {
  RootState,
  updateBookmark,
  updateBookmarkSelection
} from '../../store';

interface Props extends Pick<SelectableGridProps, 'dragging' | 'onDragStart'> {
  comicID: string;
}

const mapStateToProps = (state: RootState, { comicID }: Props) => ({
  ...state.bookmark.byIds[comicID],
  selected: state.bookmark.selection.includes(comicID),
  prevPath: state.router.location.pathname
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
      {...props}
      onRefetchSuccess={updateBookmark}
      toggleSelect={updateBookmarkSelection}
    />
  );
}

export const BookmarkGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkGridComponent);
