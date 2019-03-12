import React from 'react';
import { connect } from 'react-redux';
import FilterList from '@material-ui/icons/FilterList';
// import FitToPage from '@material-ui/icons/FullscreenExit';
// import FitToWidth from '@material-ui/icons/Fullscreen';
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
      <SidebarIcon tooltip="適應頁面" />
    </Sidebar>
  );
}

export const HomeSidebar = connect(mapStateToProps)(BaseComponent);
