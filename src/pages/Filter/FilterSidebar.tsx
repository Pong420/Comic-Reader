import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar, SidebarIcon } from '../../components/Sidebar';
import { PATHS } from '../../constants';
import { ReactComponent as ArrowBackIcon } from '../../assets/arrow_back-24px.svg';

export function FilterSidebar({ history }: RouteComponentProps) {
  return (
    <Sidebar className="filter-sidebar">
      <SidebarIcon
        tooltip="返回首頁"
        icon={ArrowBackIcon}
        onClick={() => history.push({ pathname: PATHS.HOME })}
      />
    </Sidebar>
  );
}
