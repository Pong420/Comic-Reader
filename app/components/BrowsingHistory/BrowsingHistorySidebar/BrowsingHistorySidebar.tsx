import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SidebarWithRemoveFn } from '../../Sidebar/SidebarWithRemoveFn';
import { RootState } from '../../../reducers';
import { BrowsingHistoryState } from '../../../reducers/browsingHistory';
import BrowsingHistoryActionCreator, {
  BrowsingHistoryActions
} from '../../../actions/browsingHistory';

function mapStateToProps({ browsingHistory }: RootState, ownProps: any) {
  return { ...browsingHistory, ...ownProps };
}

function mapActiontoProps(dispatch: Dispatch) {
  return bindActionCreators(BrowsingHistoryActionCreator, dispatch);
}

export function BrowsingHistorySidebarComponent({
  toogleRemovable,
  removeAllBrowsingHistory
}: BrowsingHistoryState & BrowsingHistoryActions) {
  return (
    <SidebarWithRemoveFn
      onToggleOnOff={on => toogleRemovable(on)}
      onRemoveAll={removeAllBrowsingHistory}
    />
  );
}

export const BrowsingHistorySidebar = connect(
  mapStateToProps,
  mapActiontoProps
)(BrowsingHistorySidebarComponent);
