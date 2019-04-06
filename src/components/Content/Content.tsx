import React, { useEffect, useState, useCallback, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout } from '../Layout';
import { Images } from './Images';
import { ConfirmDialog } from '../ConfirmDialog';
import { ContentSnackBar } from './ContentSnackBar';
import { RootState, ContentState, ContentActionCreators } from '../../store';
import { PATHS } from '../../constants';
import { usePagination } from '../../utils/usePagination';
import MESSAGE from './message.json';

interface MatchParam {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

const mapStateToProps = ({ content }: RootState, ownProps: any) => ({
  ...content,
  ...ownProps
});
const mapDispatchToProps = (dispath: Dispatch) =>
  bindActionCreators(ContentActionCreators, dispath);

function ContentComponent({
  error,
  loading,
  totalPage,
  prevId,
  nextId,
  history,
  match: { params },
  getContent,
  cancelGetContent
}: ContentState &
  typeof ContentActionCreators &
  RouteComponentProps<MatchParam>) {
  const { pageNo, comicID, chapterID } = params;
  const [message, setMessage] = useState('');

  const {
    prevPagePath,
    nextPagePath,
    prevChapterPath,
    nextChapterPath
  } = usePagination({
    format: PATHS.CONTENT,
    totalPage,
    params,
    prevId,
    nextId
  });

  const changePath = useCallback(
    (path: string, fn: () => void) => () =>
      path ? history.replace(path) : fn(),
    [history]
  );

  const prevPage = changePath(prevPagePath, () =>
    setMessage(MESSAGE.GOTO_PREV_CHAPTER)
  );

  const nextPage = changePath(nextPagePath, () =>
    setMessage(MESSAGE.GOTO_NEXT_CHAPTER)
  );

  const prevChapter = changePath(prevChapterPath, () =>
    setMessage(MESSAGE.FIRST_CHAPTER)
  );

  const nextChapter = changePath(nextChapterPath, () =>
    setMessage(MESSAGE.LAST_CHAPTER)
  );

  const onClose = useCallback(() => setMessage(''), []);

  const onKeyDown = useCallback(
    ({ which }: KeyboardEvent<HTMLDivElement>) => {
      if (which === 37) prevPage();
      if (which === 39) nextPage();
    },
    [nextPage, prevPage]
  );

  useEffect(() => {
    getContent({ comicID, chapterID });

    return () => {
      cancelGetContent();
    };
  }, [cancelGetContent, chapterID, comicID, getContent]);

  useEffect(() => {
    return onClose;
  }, [onClose, pageNo]);

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
        open={
          message === MESSAGE.FIRST_CHAPTER || message === MESSAGE.LAST_CHAPTER
        }
        message={message}
        onClose={onClose}
      />
      <ConfirmDialog
        open={
          message === MESSAGE.GOTO_PREV_CHAPTER ||
          message === MESSAGE.GOTO_NEXT_CHAPTER
        }
        message={message}
        onClose={onClose}
        onConfirm={() => {
          message === MESSAGE.GOTO_PREV_CHAPTER && prevChapter();
          message === MESSAGE.GOTO_NEXT_CHAPTER && nextChapter();
        }}
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
