import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Clear from '@material-ui/icons/Clear';
import { Sidebar, SidebarIcon } from '../../Sidebar';
import { ComicListActionCreators } from '../../../store';
import { PATH } from '../../../constants';

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ComicListActionCreators, dispatch);
}

export function BaseConmponent({ setFilter }: typeof ComicListActionCreators) {
  return (
    <Sidebar className="fitler-sidebar">
      <SidebarIcon Icon={ArrowBackIcon} tooltip="返回" to={PATH.HOME} />
      <SidebarIcon
        Icon={Clear}
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
