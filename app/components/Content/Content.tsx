import React, { useState, useRef, useLayoutEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout } from '../Layout';
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
    const picUrl = images[pageNo];
    const prevPicUrl = images[Number(pageNo) - 1];
    const nextPicUrl = images[Number(pageNo) + 1];
    const [error, setError] = useState(images.length && !images[pageNo]);
    const scrollerRef = useRef(null);

    const navigate = (evt: MouseEvent | undefined, step: number) => {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;

      if (images[newPageNo]) {
        history.replace(match.url.replace(/\/.\d*$/, `/${newPageNo}`));

        if (newPageNo === 0) {
          // TODO:
        }

        if (newPageNo === images.length - 1) {
          // TODO:
        }
      }
    };

    const onClick = (evt: MouseEvent) => navigate(evt, 1);
    const onContextMenu = (evt: MouseEvent) => navigate(evt, -1);

    useLayoutEffect(() => {
      scrollerRef.current.scrollTop = 0;
    }, [pageNo]);

    return (
      <Layout
        className="content-page"
        onClick={onClick}
        onContextMenu={onContextMenu}
      >
        <div className="content-page-scroller" ref={scrollerRef}>
          {!error && <div className="loading">撈緊...</div>}
          {picUrl && (
            <img
              className="image"
              src={picUrl}
              key={picUrl}
              onError={() => setError(true)}
            />
          )}
          {prevPicUrl && <img src={prevPicUrl} hidden />}
          {nextPicUrl && <img src={nextPicUrl} hidden />}
          {error && <div className="error">張圖撈唔到，試下下一頁</div>}
        </div>
      </Layout>
    );
  }
);
