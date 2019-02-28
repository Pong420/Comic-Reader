import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sidebar } from '../../Sidebar';
import { BookmarkBtn } from '../../BookmarkBtn';

interface MatchParam {
  comicID: string;
}

export function ComicSidebar({ match }: RouteComponentProps<MatchParam>) {
  return (
    <Sidebar className="comic-sidebar">
      <BookmarkBtn comicID={match.params.comicID} />
    </Sidebar>
  );
}
