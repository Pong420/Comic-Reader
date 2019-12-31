import React from 'react';
import { useSelector } from 'react-redux';
import { Sidebar, SidebarIcon } from '../../components/Sidebar';
import { PATHS } from '../../constants';
import { comicsFilterSelector } from '../../store';
import { ReactComponent as FilterIcon } from '../../assets/filter_list-24px.svg';

export function HomeSidebar() {
  const filter = useSelector(comicsFilterSelector);
  const filtered = filter.some(v => !!v);

  return (
    <Sidebar className="home-sidebar">
      <span className={`${filtered ? 'filtered' : ''}`}>
        <SidebarIcon
          tooltip="過濾"
          to={PATHS.FILTER}
          icon={FilterIcon}
          isActive={filtered}
        />
      </span>
    </Sidebar>
  );
}
