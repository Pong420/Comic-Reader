import React, { useState, useRef, useLayoutEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Previous from '@material-ui/icons/ArrowBack';
import Star from '@material-ui/icons/StarRounded';
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

    const navigate = (evt: MouseEvent | undefined, step: number) => {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;

      const onConfirm = (chapterID: number | undefined) => () => {
        history.push(
          chapterID ? `/content/${match.params.comicID}/${chapterID}/0` : '/'
        );
      };

      if (newPageNo === -1) {
        setDialogProps(prevState => ({
          ...prevState,
          msg: prevId
            ? `已經係第一頁，返回上一話？`
            : '已經係第一話，返回首頁?',
          open: true,
          onConfirm: onConfirm(prevId)
        }));

        return;
      }

      if (newPageNo === images.length) {
        setDialogProps(prevState => ({
          ...prevState,
          msg: nextId
            ? `已經係最後一頁，睇下一話？`
            : `已經係最後一話，返回首頁?`,
          open: true,
          onConfirm: onConfirm(nextId)
        }));

        return;
      }

      if (images[newPageNo]) {
        history.replace(match.url.replace(/\/.\d*$/, `/${newPageNo}`));
      }
    };

    const onClick = (evt: MouseEvent) => navigate(evt, 1);
    const onContextMenu = (evt: MouseEvent) => navigate(evt, -1);

    useLayoutEffect(() => {
      scrollerRef.current.scrollTop = 0;
    }, [pageNo]);

    return (
      <>
        <Layout
          className="content-page"
          sidebarIcons={[
            Star,
            {
              component: Previous,
              onClick() {
                history.push(`/comic/${match.params.comicID}`);
              }
            },
            () => <div style={{ flex: '1 1 auto' }} />,
            {
              component: ({ className, ...props }: any) => (
                <div className={`${className} page-nav-button`} {...props}>
                  <sup>{Number(pageNo) + 1}</sup> / <sub>{images.length}</sub>
                </div>
              )
            }
          ]}
          contentProps={{
            onClick,
            onContextMenu
          }}
        >
          <div className="content-page-scroller" ref={scrollerRef}>
            {!error && <div className="image-loading">撈緊...</div>}
            {images.map((url, index: number) => {
              const props =
                index === Number(pageNo)
                  ? {
                      className: 'image',
                      onError: () => setError(true)
                    }
                  : {
                      hidden: true
                    };

              return <img src={url} key={index} {...props} />;
            })}
            {error && <div className="image-error">張圖撈唔到，試下下一頁</div>}
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
