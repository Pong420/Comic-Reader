import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SidebarWithRemoveFn } from '../../Sidebar/SidebarWithRemoveFn';
import {
  RootState,
  BrowsingHistoryState,
  BrowsingHistoryActionCreators
} from '../../../store';

function mapStateToProps({ browsingHistory }: RootState, ownProps: any) {
  return { ...browsingHistory, ...ownProps };
}

function mapActiontoProps(dispatch: Dispatch) {
  return bindActionCreators(BrowsingHistoryActionCreators, dispatch);
}

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
