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

export const Content = withRouter(
  ({
    images = [],
    pageNo,
    history,
    match
  }: RouteComponentProps & ContentProps) => {
    const [error, setError] = useState(images.length && !images[pageNo]);
    const [dialogProps, setDialogProps] = useState({
      msg: '',
      open: false
    });
    const scrollerRef = useRef(null);

    const navigate = (evt: MouseEvent | undefined, step: number) => {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;

      if (newPageNo === -1) {
        setDialogProps(prevState => ({
          ...prevState,
          msg: `已經係第一頁，返回上一話？`,
          open: true
        }));

        return;
      }

      if (newPageNo === images.length) {
        setDialogProps(prevState => ({
          ...prevState,
          msg: `已經係最後一頁，睇下一話？`,
          open: true
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
          contentProps={{
            onClick,
            onContextMenu
          }}
          sidebarIcons={[Star, Previous]}
        >
          <div className="content-page-scroller" ref={scrollerRef}>
            {!error && <div className="loading">撈緊...</div>}
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
            {error && <div className="error">張圖撈唔到，試下下一頁</div>}
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
