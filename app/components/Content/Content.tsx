import React, { useState, useRef, useLayoutEffect, KeyboardEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Previous from '@material-ui/icons/ArrowBack';
import { Layout } from '../Layout';
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
    const scrollerRef = useRef(null);
    const [error, setError] = useState(images.length && !images[pageNo]);
    const [dialogProps, setDialogProps] = useState({
      msg: '',
      open: false
    });

    const prevChapter = () => changeChapter(prevId);
    const nextChapter = () => changeChapter(nextId);
    const nextPage = (evt?: Event) => changePage(evt, 1);
    const prevPage = (evt?: Event) => changePage(evt, -1);

    function changeChapter(chapterID: number) {
      history.push(
        chapterID !== 0
          ? `/content/${match.params.comicID}/${chapterID}/0`
          : '/'
      );
    }

    function changePage(evt: Event | undefined, step: number) {
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

    const FlexSpacer = () => <div style={{ flex: '1 1 auto' }} />;

    const PageNoButton = ({ className, ...props }: any) => (
      <div className={`${className} page-no-button`} {...props}>
        <sup>{Number(pageNo) + 1}</sup> / <sub>{images.length}</sub>
      </div>
    );

    const sidebarIcons = [
      {
        component: Previous,
        onClick() {
          history.push(`/comic/${match.params.comicID}`);
        }
      },
      FlexSpacer,
      {
        component: PageNoButton
      }
    ];

    const Images = () =>
      images.map((url, index: number) => {
        let props = null;

        if (index === Number(pageNo)) {
          props = {
            className: 'image',
            onError: () => setError(true)
          };
        }

        return <img src={url} key={url} {...props} />;
      });

    useLayoutEffect(() => {
      scrollerRef.current.scrollTop = 0;
      scrollerRef.current.focus();
    }, [pageNo]);

    return (
      <>
        <Layout
          className="content-page"
          sidebarIcons={sidebarIcons}
          contentProps={{
            onClick: nextPage,
            onContextMenu: prevPage
          }}
        >
          <div
            className="content-page-scroller"
            ref={scrollerRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            {error && <div className="image-error">張圖撈唔到，試下下一頁</div>}
            {!error && <div className="image-loading">撈緊...</div>}
            {Images}
          </div>
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
