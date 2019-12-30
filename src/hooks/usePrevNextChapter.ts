import React, { useMemo, SyntheticEvent } from 'react';
import { useRouteMatch, useHistory, generatePath } from 'react-router';
import { Button, IButtonProps } from '@blueprintjs/core';
import { PATHS } from '../constants';
import { Toaster } from '../utils/toaster';

interface Props {
  prevId?: number;
  nextId?: number;
  total: number;
  beforeChapterChanged: () => void;
}

interface MatchParams {
  comicID: string;
  chapterID: string;
  pageNo?: string;
}

function renderWithButton(
  msg: string,
  button: string,
  onClick: IButtonProps['onClick']
) {
  return React.createElement(
    'div',
    null,
    React.createElement('span', null, msg),
    React.createElement(Button, { onClick, minimal: true, small: true }, button)
  );
}

export function usePrevNextChapter({
  prevId,
  nextId,
  total,
  beforeChapterChanged
}: Props) {
  const history = useHistory();
  const match = useRouteMatch<MatchParams>();

  const pageNo = Number(match.params.pageNo || 1);

  const [nextPage, prevPage] = useMemo(() => {
    const handler = (step: number) => (evt?: SyntheticEvent<HTMLElement>) => {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;
      const push = (params: { [X in keyof MatchParams]?: any } = {}) => {
        history.push(
          generatePath(PATHS.COMIC_CONTENT, {
            ...match.params,
            ...params
          })
        );
      };

      if (newPageNo <= 0) {
        Toaster.bottom({
          message: prevId
            ? renderWithButton('已經係第一頁', '返回上一集', () => {
                beforeChapterChanged();
                push({ pageNo: 1, chapterID: prevId });
              })
            : '已經係第一集'
        });
      } else if (newPageNo > total) {
        Toaster.bottom({
          message: nextId
            ? renderWithButton('已經係最後一頁', '睇下一集', () => {
                beforeChapterChanged();
                push({ pageNo: 1, chapterID: nextId });
              })
            : '已經係最後一集'
        });
      } else {
        push({ pageNo: newPageNo });
      }
    };

    return [handler(1), handler(-1)];
  }, [
    history,
    match.params,
    pageNo,
    prevId,
    nextId,
    total,
    beforeChapterChanged
  ]);

  return { nextPage, prevPage };
}
