import React from 'react';
import { connect } from 'react-redux';
import FilterList from '@material-ui/icons/FilterList';
import { Sidebar } from '../../Sidebar';
import { SidebarIcon } from '../../Sidebar/SidebarIcon';
import { RootState, ComicListState } from '../../../store';

function mapStateToProps({ comicList }: RootState) {
  return { ...comicList };
}

export function BaseComponent({ filter }: ComicListState) {
  return (
    <Sidebar className="comic-sidebar">
      <SidebarIcon
        to="/filter"
        tooltip="篩選"
        Icon={FilterList}
        badage={!!filter.join('')}
      />
    </Sidebar>
  );
}

export const HomeSidebar = connect(mapStateToProps)(BaseComponent);
