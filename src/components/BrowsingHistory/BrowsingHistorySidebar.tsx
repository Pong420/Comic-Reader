import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SidebarWithRemoveFn } from '../Sidebar/SidebarWithRemoveFn';
import { RootState, BrowsingHistoryState, BrowsingHistoryActionCreators } from '../../store';

const mapStateToProps = ({ browsingHistory }: RootState, ownProps: any) => ({ ...browsingHistory, ...ownProps });
const mapActiontoProps = (dispatch: Dispatch) => bindActionCreators(BrowsingHistoryActionCreators, dispatch);

export function BrowsingHistorySidebarComponent({
  removable,
  removeAllBrowsingHistory,
  toggleBrowsingHistoryRemovable
}: BrowsingHistoryState & typeof BrowsingHistoryActionCreators) {
  return (
    <SidebarWithRemoveFn
      on={removable}
      onToggleOnOff={toggleBrowsingHistoryRemovable}
      onRemoveAll={removeAllBrowsingHistory}
    />
  );
}

export const BrowsingHistorySidebar = connect(
  mapStateToProps,
  mapActiontoProps
)(BrowsingHistorySidebarComponent);
