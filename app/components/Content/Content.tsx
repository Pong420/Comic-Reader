import React, {
  useState,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useCallback
} from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  RouteComponentProps,
  generatePath
} from 'react-router-dom';
import { Layout } from '../Layout';
import { Images } from './Images';
import { ConfirmDialog } from '../ConfirmDialog';
import { ContentSnackBar } from './ContentSnackBar';
import { RootState, ContentState } from '../../store';
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

function ContentComponent({
  error,
  loading,
  images,
  prevId,
  nextId,
  history,
  match
}: ContentState & RouteComponentProps<MatchParam>) {
  const { pageNo, comicID } = match.params;
  const [message, setMessage] = useState('');

  const changeChapter = useCallback(
    (chapterID: number | undefined) => {
      history.push(
        chapterID
          ? generatePath(PATH.CONTENT, { comicID, chapterID, pageNo: 1 })
          : PATH.HOME
      );
    },
    [comicID, history]
  );

  const prevChapter = useCallback(() => changeChapter(prevId), [
    changeChapter,
    prevId
  ]);

  const nextChapter = useCallback(() => changeChapter(nextId), [
    changeChapter,
    nextId
  ]);

  const changePage = useCallback(
    (evt: MouseEvent<HTMLDivElement> | undefined, step: number) => {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;

      if (images[newPageNo - 1]) {
        history.replace(
          generatePath(PATH.CONTENT, {
            ...match.params,
            pageNo: newPageNo
          })
        );
      }

      if (newPageNo < 1) {
        setMessage(prevId ? MESSAGE.PREV_CHAPTER : MESSAGE.FIRST_CHAPTER);
      }

      if (newPageNo > images.length) {
        setMessage(nextId ? MESSAGE.NEXT_CHAPTER : MESSAGE.LAST_CHAPTER);
      }
    },
    [history, images, match.params, pageNo, nextId, prevId]
  );

  const nextPage = useCallback(
    (evt?: MouseEvent<HTMLDivElement>) => changePage(evt, 1),
    [changePage]
  );

  const prevPage = useCallback(
    (evt?: MouseEvent<HTMLDivElement>) => changePage(evt, -1),
    [changePage]
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
          message === MESSAGE.PREV_CHAPTER || message === MESSAGE.NEXT_CHAPTER
        }
        message={message}
        onClose={onClose}
        onConfirm={() => {
          message === MESSAGE.PREV_CHAPTER && prevChapter();
          message === MESSAGE.NEXT_CHAPTER && nextChapter();
        }}
      />
    </>
  );
}

export const Content = withRouter(connect(mapStateToProps)(ContentComponent));
