import { useMemo, useCallback } from 'react';
import { generatePath } from 'react-router-dom';

interface MatchParam {
  pageNo: string;
}

interface Props {
  totalPage: number;
  params: MatchParam;
  format: string;
  prevId?: number;
  nextId?: number;
}

export function usePagination({
  totalPage,
  params,
  format,
  prevId,
  nextId
}: Props) {
  const changePage = useCallback(
    (step: number) => {
      const newPageNo = Number(params.pageNo) + step;

      if (newPageNo > 0 && newPageNo <= totalPage) {
        return generatePath(format, {
          ...params,
          pageNo: newPageNo
        });
      }

      return '';
    },
    [format, params, totalPage]
  );

  const changeChapter = useCallback(
    (chapterID?: number) => {
      return chapterID
        ? generatePath(format, {
            ...params,
            chapterID,
            pageNo: 1
          })
        : '';
    },
    [format, params]
  );

  const prevChapterPath = useMemo(() => changeChapter(prevId), [
    changeChapter,
    prevId
  ]);
  const nextChapterPath = useMemo(() => changeChapter(nextId), [
    changeChapter,
    nextId
  ]);
  const prevPagePath = useMemo(() => changePage(-1), [changePage]);
  const nextPagePath = useMemo(() => changePage(1), [changePage]);

  return {
    prevPagePath,
    nextPagePath,
    prevChapterPath,
    nextChapterPath
  };
}
