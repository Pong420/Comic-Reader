import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { useComicContent } from '../../hooks/useComicContent';
import { Pagination } from './Pagination';

export function ComicContentSidebar() {
  const { pageNo, total, handlePageChange } = useComicContent();
  return (
    <Sidebar className="comic-content-sidebar">
      <div className="flex-spacer" />
      <Pagination pageNo={pageNo} total={total} onChange={handlePageChange} />
    </Sidebar>
  );
}
