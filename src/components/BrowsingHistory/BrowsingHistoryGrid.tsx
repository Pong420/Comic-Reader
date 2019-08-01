import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { SelectableGrid, SelectableGridProps } from '../Grid/SelectableGrid';
import {
  RootState,
  updateBrowsingHistory,
  updateBrowsingHistorySelection
} from '../../store';

interface Props extends Pick<SelectableGridProps, 'dragging' | 'onDragStart'> {
  comicID: string;
}

const mapStateToProps = (state: RootState, { comicID }: Props) => ({
  ...state.browsingHistory.byIds[comicID],
  selected: state.browsingHistory.selection.includes(comicID),
  prevPath: state.router.location.pathname
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { updateBrowsingHistory, updateBrowsingHistorySelection },
    dispatch
  );

export function BrowsingHistoryGridComponent({
  chapterID,
  updateBrowsingHistory,
  updateBrowsingHistorySelection,
  ...props
}: Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>) {
  return (
    <SelectableGrid
      {...props}
      onRefetchSuccess={updateBrowsingHistory}
      toggleSelect={updateBrowsingHistorySelection}
    />
  );
}

export const BrowsingHistoryGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowsingHistoryGridComponent);
