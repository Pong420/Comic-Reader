import React, { useMemo, SyntheticEvent } from 'react';
import { generatePath } from 'react-router';
import { Button, IButtonProps } from '@blueprintjs/core';
import { PATHS } from '../constants';
import { Toaster } from '../utils/toaster';
import { history } from '../store';

interface Props {
  comicID?: string | number;
  chapterID?: string | number;
  pageNo?: number;
  prevId?: number;
  nextId?: number;
  total: number;
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

type Parmas = Partial<Pick<Props, 'pageNo' | 'chapterID'>>;

export function usePrevNextChapter({
  pageNo,
  chapterID,
  comicID,
  prevId,
  nextId,
  total
}: Props) {
  return useMemo(() => {
    const navigate = (params: Parmas) => {
      history.push(
        generatePath(PATHS.COMIC_CONTENT, {
          chapterID,
          comicID,
          pageNo: 1,
          ...params
        })
      );
    };

    const prevChapter = () =>
      prevId
        ? navigate({ chapterID: prevId })
        : Toaster.bottom({ message: '已經係第一集' });

    const nextChapter = () =>
      nextId
        ? navigate({ chapterID: nextId })
        : Toaster.bottom({ message: '已經係最後一集' });

    const changePage = (step: number) => (
      evt?: SyntheticEvent<HTMLElement>
    ) => {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;

      if (newPageNo <= 0) {
        if (prevId) {
          Toaster.bottom({
            message: renderWithButton('已經係第一頁', '返回上一集', prevChapter)
          });
        } else {
          prevChapter();
        }
      } else if (newPageNo > total) {
        if (nextId) {
          Toaster.bottom({
            message: renderWithButton('已經係最後一頁', '睇下一集', nextChapter)
          });
        } else {
          nextChapter();
        }
      } else {
        navigate({ pageNo: newPageNo });
      }
    };

    return {
      nextPage: changePage(1),
      prevPage: changePage(-1),
      nextChapter,
      prevChapter
    };
  }, [chapterID, comicID, pageNo, prevId, nextId, total]);
}
