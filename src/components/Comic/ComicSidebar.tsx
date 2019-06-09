import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { BookmarkBtn } from '../BookmarkBtn';

interface MatchParams {
  comicID: string;
}

export function ComicSidebar({ match }: RouteComponentProps<MatchParams>) {
  return (
    <Sidebar className="comic-sidebar">
      <BookmarkBtn comicID={match.params.comicID} />
    </Sidebar>
  );
}
