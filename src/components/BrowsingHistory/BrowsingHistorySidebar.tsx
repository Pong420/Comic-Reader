import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SelectionSidebar } from '../Sidebar/SelectionSidebar';
import { RootState, BrowsingHistoryActionCreators } from '../../store';

const mapStateToProps = ({ browsingHistory }: RootState) => ({
  ...browsingHistory
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(BrowsingHistoryActionCreators, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const BrowsingHistorySidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    seletable,
    selection,
    browsingHistory,
    removeBrowsingHistory,
    toggleBrowsingHistorySelection,
    updateBrowsingHistroySelection
  }: Props) => {
    const selectedAll = selection.length === browsingHistory.length;
    const toggleSelectAll = () =>
      updateBrowsingHistroySelection(
        selectedAll ? [] : browsingHistory.map(([_, { comicID }]) => comicID)
      );

    const onDelete = () => removeBrowsingHistory(selection);

    return (
      <SelectionSidebar
        seletable={seletable}
        selectedAll={selectedAll}
        toggle={toggleBrowsingHistorySelection}
        toggleSelectAll={toggleSelectAll}
        onDelete={onDelete}
      />
    );
  }
);
