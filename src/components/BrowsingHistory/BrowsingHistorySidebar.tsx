import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SelectionSidebar } from '../Sidebar/SelectionSidebar';
import { RootState, BrowsingHistoryActionCreators } from '../../store';

const mapStateToProps = (state: RootState) => ({
  selectable: state.browsingHistory.selectable,
  selectedAll:
    state.browsingHistory.selection.length === state.browsingHistory.ids.length
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(BrowsingHistoryActionCreators, dispatch);

export function BrowsingHistorySidebarComponent({
  selectable,
  selectedAll,
  toggleBrowsingHistorySelectAll,
  toggleBrowsingHistorySelectable,
  removeBrowsingHistory
}: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>) {
  return (
    <SelectionSidebar
      selectable={selectable}
      selectedAll={selectedAll}
      toggleSelectable={toggleBrowsingHistorySelectable}
      toggleSelectAll={toggleBrowsingHistorySelectAll}
      onRemove={removeBrowsingHistory}
    />
  );
}

export const BrowsingHistorySidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowsingHistorySidebarComponent);
