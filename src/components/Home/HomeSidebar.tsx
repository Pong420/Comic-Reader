import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import FilterList from '@material-ui/icons/FilterList';
import { Sidebar, SidebarIcon } from '../Sidebar';
import { RootState, HomeState } from '../../store';
import { PATHS } from '../../constants';

const mapStateToProps = ({ home }: RootState) => ({ ...home });

export function BaseComponent({ filter }: HomeState) {
  const filtered = useMemo(() => !!filter.join(''), [filter]);

  return (
    <Sidebar className="comic-sidebar">
      <SidebarIcon to={PATHS.FILTER} tooltip="篩選" Icon={FilterList} active={filtered} badage={filtered} />
    </Sidebar>
  );
}

export const HomeSidebar = connect(mapStateToProps)(BaseComponent);
