import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar, SidebarIcon } from '../../components/Sidebar';
import { BookmarkBtn } from '../../components/BookmarkBtn';
import { PATHS } from '../../constants';
import { ReactComponent as ArrowBackIcon } from '../../assets/arrow_back-24px.svg';

interface MatchParams {
  comicID: string;
}

export function ComicDetailsSidebar({
  location,
  history,
  match
}: RouteComponentProps<MatchParams, {}, { prevPath: string } | undefined>) {
  const prevPath = location.state && location.state.prevPath;

  const goBack = useCallback(() => history.push(prevPath || PATHS.HOME), [
    history,
    prevPath
  ]);

  return (
    <Sidebar className="comic-details-sidebar">
      <SidebarIcon tooltip="返回" icon={ArrowBackIcon} onClick={goBack} />
      <BookmarkBtn comicID={match.params.comicID} />
    </Sidebar>
  );
}
