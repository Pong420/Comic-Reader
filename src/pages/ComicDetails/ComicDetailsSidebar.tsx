import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar, SidebarIcon } from '../../components/Sidebar';
import { PATHS } from '../../constants';
import { ReactComponent as ArrowBackIcon } from '../../assets/arrow_back-24px.svg';

export function ComicDetailsSidebar({
  location,
  history
}: RouteComponentProps) {
  const prevPath = location.state && location.state.prevPath;

  const goBack = useCallback(() => history.push(prevPath || PATHS.HOME), [
    history,
    prevPath
  ]);

  return (
    <Sidebar className="comic-details-sidebar">
      <SidebarIcon icon={ArrowBackIcon} onClick={goBack} />
    </Sidebar>
  );
}
