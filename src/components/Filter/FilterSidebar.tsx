import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Sidebar, SidebarIcon } from '../Sidebar';
import { HomeActionCreators } from '../../store';
import { PATHS } from '../../constants';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(HomeActionCreators, dispatch);

export function BaseConmponent({ setFilter }: typeof HomeActionCreators) {
  return (
    <Sidebar className="fitler-sidebar">
      <SidebarIcon Icon={ArrowBackIcon} tooltip="返回" to={PATHS.HOME} />
      <SidebarIcon
        Icon={ClearIcon}
        tooltip="清除選項"
        onClick={() => setFilter([])}
      />
    </Sidebar>
  );
}

export const FilterSidebar = connect(
  null,
  mapDispatchToProps
)(BaseConmponent);
