import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { BookmarkBtn } from '../BookmarkBtn';
import { KeyboardDialog } from '../KeyboardDialog';
import shortcuts from './shortcuts.json';

interface MatchParams {
  comicID: string;
}

export function ComicSidebar({ match }: RouteComponentProps<MatchParams>) {
  return (
    <Sidebar className="comic-sidebar">
      <BookmarkBtn comicID={match.params.comicID} />
      <div className="flex-spacer" />
      <KeyboardDialog shortcuts={shortcuts} />
    </Sidebar>
  );
}
