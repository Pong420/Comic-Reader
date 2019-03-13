import React, { useState, KeyboardEvent, MouseEvent, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter,
  RouteComponentProps,
  generatePath
} from 'react-router-dom';
import { Layout } from '../Layout';
import { Images } from './Images';
import { ConfirmDialog, ConfirmDialogProps } from '../ConfirmDialog';
import {
  RootState,
  ContentState,
  BrowsingHistoryActionCreators
} from '../../store';
import PATH from '../../paths.json';

interface MatchParam {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

function mapStateToProps({ content }: RootState, ownProps: any) {
  return {
    ...content,
    ...ownProps
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(BrowsingHistoryActionCreators, dispatch);
}

const initialContentDialogProps = {
  msg: '',
  open: false,
  onConfirm: () => {},
  onClose: () => {}
};

function ContentComponent({
  error,
  loading,
  images,
  prevId,
  nextId,
  history,
  match,
  addBrowsingHistory
}: ContentState &
  typeof BrowsingHistoryActionCreators &
  RouteComponentProps<MatchParam>) {
  const { pageNo, comicID, chapterID } = match.params;
  const [dialogProps, setDialogProps] = useState(initialContentDialogProps);

  const prevChapter = () => changeChapter(prevId);
  const nextChapter = () => changeChapter(nextId);
  const nextPage = (evt?: MouseEvent<HTMLDivElement>) => changePage(evt, 1);
  const prevPage = (evt?: MouseEvent<HTMLDivElement>) => changePage(evt, -1);

  function changeChapter(chapterID: number | undefined) {
    history.push(
      chapterID
        ? generatePath(PATH.CONTENT, { comicID, chapterID, pageNo: 1 })
        : PATH.HOME
    );
  }

  function changePage(
    evt: MouseEvent<HTMLDivElement> | undefined,
    step: number
  ) {
    evt && evt.preventDefault();

    const newPageNo = Number(pageNo) + step;

    if (newPageNo < 1) {
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

    if (newPageNo > images.length) {
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

    if (images[newPageNo - 1]) {
      history.replace(match.url.replace(/\/.\d*$/, `/${newPageNo}`));
    }
  }

  function onKeyDown({ which }: KeyboardEvent<HTMLDivElement>) {
    if (which === 37) prevPage();
    if (which === 39) nextPage();
  }

  useEffect(() => {
    addBrowsingHistory({
      comicID,
      chapterID
    });
  }, [comicID, chapterID]);

  return (
    <>
      <Layout className="content-page" loading={loading} error={error}>
        <Images
          activeIndex={Number(pageNo) - 1}
          onKeyDown={onKeyDown}
          onClick={nextPage}
          onContextMenu={prevPage}
        />
      </Layout>
      <ConfirmDialog
        {...dialogProps}
        onClose={() =>
          setDialogProps((prevState: ConfirmDialogProps) => ({
            ...prevState,
            open: false
          }))
        }
      />
    </>
  );
}

export const Content = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContentComponent)
);
