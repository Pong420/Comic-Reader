import React, { useState, KeyboardEvent, MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout } from '../Layout';
import { Images } from './Images';
import { ContentDialog } from './ContentDialog';
import { ContentData } from '../../../typing';

export interface ContentProps extends ContentData {
  pageNo: string;
}

interface MatchParam {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

export const Content = withRouter(
  ({
    images = [],
    pageNo,
    prevId,
    nextId,
    history,
    match
  }: RouteComponentProps<MatchParam> & ContentProps) => {
    const [dialogProps, setDialogProps] = useState({
      msg: '',
      open: false
    });

    const prevChapter = () => changeChapter(prevId);
    const nextChapter = () => changeChapter(nextId);
    const nextPage = (evt?: MouseEvent<HTMLDivElement>) => changePage(evt, 1);
    const prevPage = (evt?: MouseEvent<HTMLDivElement>) => changePage(evt, -1);

    function changeChapter(chapterID: number) {
      history.push(
        chapterID !== 0
          ? `/content/${match.params.comicID}/${chapterID}/0`
          : '/'
      );
    }

    function changePage(
      evt: MouseEvent<HTMLDivElement> | undefined,
      step: number
    ) {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;

      if (newPageNo === -1) {
        setDialogProps(prevState => ({
          ...prevState,
          msg:
            prevId !== 0
              ? `已經係第一頁，返回上一話？`
              : '已經係第一話，返回首頁?',
          open: true,
          onConfirm: prevChapter
        }));

        return;
      }

      if (newPageNo === images.length) {
        setDialogProps(prevState => ({
          ...prevState,
          msg:
            nextId !== 0
              ? `已經係最後一頁，睇下一話？`
              : `已經係最後一話，返回首頁?`,
          open: true,
          onConfirm: nextChapter
        }));

        return;
      }

      if (images[newPageNo]) {
        history.replace(match.url.replace(/\/.\d*$/, `/${newPageNo}`));
      }
    }

    function onKeyDown({ which }: KeyboardEvent<HTMLDivElement>) {
      if (which === 37) prevPage();
      if (which === 39) nextPage();
    }

    return (
      <>
        <Layout
          className="content-page"
          contentProps={{
            onClick: nextPage,
            onContextMenu: prevPage
          }}
        >
          <Images
            active={Number(pageNo)}
            images={images}
            tabIndex={0}
            onKeyDown={onKeyDown}
          />
        </Layout>
        <ContentDialog
          {...dialogProps}
          onClose={() =>
            setDialogProps(prevState => ({
              ...prevState,
              open: false
            }))
          }
        />
      </>
    );
  }
);
