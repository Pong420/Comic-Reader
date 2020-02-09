import React from 'react';
import { RouteComponentProps, generatePath } from 'react-router-dom';
import { Sidebar, SidebarIcon } from '../../components/Sidebar';
import { BookmarkBtn } from '../../components/BookmarkBtn';
import { useComicContent, MatchParams } from '../../hooks/useComicContent';
import { Pagination } from './Pagination';
import { PATHS } from '../../constants';
import { ReactComponent as ArrowBackIcon } from '../../assets/arrow_back-24px.svg';
import { ReactComponent as SkipNextIcon } from '../../assets/skip_next-24px.svg';
import { ReactComponent as AspectRatioIcon } from '../../assets/aspect_ratio-24px.svg';

export function ComicContentSidebar({
  history,
  match
}: RouteComponentProps<MatchParams>) {
  const {
    pageNo,
    total,
    handlePageChange,
    nextChapter,
    fitToPage,
    toggleFitToPage
  } = useComicContent();
  const { comicID } = match.params;
  return (
    <Sidebar className="comic-content-sidebar">
      <SidebarIcon
        tooltip="返回"
        icon={ArrowBackIcon}
        onClick={() =>
          history.push(generatePath(PATHS.COMIC_DETAILS, { comicID }))
        }
      />

      <BookmarkBtn comicID={comicID} />

      <SidebarIcon tooltip="下一集" icon={SkipNextIcon} onClick={nextChapter} />

      <SidebarIcon
        tooltip={fitToPage ? '預設大小' : '適合頁面'}
        icon={AspectRatioIcon}
        isActive={fitToPage}
        onClick={toggleFitToPage}
      />

      <div className="flex-spacer" />

      <Pagination pageNo={pageNo} total={total} onChange={handlePageChange} />
    </Sidebar>
  );
}
