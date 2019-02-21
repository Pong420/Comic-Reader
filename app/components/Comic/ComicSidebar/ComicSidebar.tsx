import React from 'react';
import { RouteComponentProps } from 'react-router';
import Previous from '@material-ui/icons/ArrowBack';
import { Sidebar, SidebarIcon } from '../../Sidebar';
import { BookmarkBtn } from '../../BookmarkBtn';

interface MatchParam {
  comicID: string;
}

export function ComicSidebar({
  match,
  history
}: RouteComponentProps<MatchParam>) {
  return (
    <Sidebar className="comic-sidebar">
      <SidebarIcon Icon={Previous} onClick={() => history.push('/')} />
      <BookmarkBtn comicID={match.params.comicID} />
    </Sidebar>
  );
}
