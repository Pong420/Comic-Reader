import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { SelectableGrid } from '../Grid';
import {
  RootState,
  updateBrowsingHistory,
  updateBrowsingHistorySelection
} from '../../store';

interface Props {
  comicID: string;
}

const mapStateToProps = (state: RootState, { comicID }: Props) => ({
  ...state.browsingHistory.byIds[comicID],
  selected: state.browsingHistory.selection.includes(comicID)
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
      toggleSelect={updateBrowsingHistorySelection}
      onRefetchSuccess={updateBrowsingHistory}
    />
  );
}

export const BrowsingHistoryGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowsingHistoryGridComponent);
