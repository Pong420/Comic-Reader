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
import { ContentSnackBar, ContentSnackBarProps } from './ContentSnackBar';
import {
  RootState,
  ContentState,
  BrowsingHistoryActionCreators
} from '../../store';
import { PATH } from '../../constants';
import MESSAGE from './message.json';

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

const initialSnackBarProps = {
  message: '',
  open: false,
  onClose: () => {}
};

const initialContentDialogProps = {
  message: '',
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
  const [snackbarProps, setSnackbarProps] = useState<ContentSnackBarProps>(
    initialSnackBarProps
  );
  const [dialogProps, setDialogProps] = useState<ConfirmDialogProps>(
    initialContentDialogProps
  );

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
      if (prevId === 0) {
        setSnackbarProps({
          ...snackbarProps,
          message: MESSAGE.FIRST_CHAPTER,
          open: true
        });
      } else {
        setDialogProps({
          ...dialogProps,
          message: MESSAGE.FIRST_PAGE,
          open: true,
          onConfirm: prevChapter
        });
      }

      return;
    }

    if (newPageNo > images.length) {
      if (nextId === 0) {
        setSnackbarProps({
          ...snackbarProps,
          message: MESSAGE.LAST_CHAPTER,
          open: true
        });
      } else {
        setDialogProps({
          ...dialogProps,
          message: MESSAGE.LAST_PAGE,
          open: true,
          onConfirm: nextChapter
        });
      }

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
  }, [comicID, chapterID, addBrowsingHistory]);

  useEffect(() => {
    return () => {
      setSnackbarProps({
        ...snackbarProps,
        open: false
      });
    };
  }, [pageNo, snackbarProps]);

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
      <ContentSnackBar
        {...snackbarProps}
        onClose={() =>
          setSnackbarProps(prevState => ({
            ...prevState,
            open: false
          }))
        }
      />
      <ConfirmDialog
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

export const Content = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContentComponent)
);
