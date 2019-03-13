import React from 'react';
import { connect } from 'react-redux';
import FilterList from '@material-ui/icons/FilterList';
import { Sidebar } from '../../Sidebar';
import { SidebarIcon } from '../../Sidebar/SidebarIcon';
import { RootState, ComicListState, ImagesState } from '../../../store';

function mapStateToProps({ comicList, images }: RootState) {
  return { ...comicList, ...images };
}

export function BaseComponent({ filter }: ComicListState & ImagesState) {
  const filtered = !!filter.join('');

  return (
    <Sidebar className="comic-sidebar">
      <SidebarIcon
        to="/filter"
        tooltip="篩選"
        Icon={FilterList}
        active={filtered}
        badage={filtered}
      />
    </Sidebar>
  );
}

export const HomeSidebar = connect(mapStateToProps)(BaseComponent);
