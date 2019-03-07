import React from 'react';
import FilterList from '@material-ui/icons/FilterList';
import { Sidebar } from '../../Sidebar';
import { SidebarIcon } from '../../Sidebar/SidebarIcon';

export function HomeSidebar() {
  return (
    <Sidebar className="comic-sidebar">
      <SidebarIcon to="/filter" tooltip="篩選" Icon={FilterList} />
    </Sidebar>
  );
}
