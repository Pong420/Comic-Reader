import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {
  withRouter,
  RouteComponentProps,
  generatePath
} from 'react-router-dom';
import { Layout } from '../Layout';
import { Images } from './Images';
import { ConfirmDialog } from '../ConfirmDialog';
import { ContentSnackBar } from './ContentSnackBar';
import { RootState, ContentState, ContentActionCreators } from '../../store';
import { PATHS } from '../../constants';
// import MESSAGE from './message.json';

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
  prevId,
  nextId,
  history,
  getContent,
  match
}: ContentState &
  typeof ContentActionCreators &
  RouteComponentProps<MatchParam>) {
  const { pageNo, comicID, chapterID } = match.params;

  useEffect(() => {
    getContent({ comicID, chapterID });
  }, [chapterID, comicID, getContent]);

  return (
    <>
      <Layout className="content-page" loading={loading} error={error}>
        <Images
          activeIndex={Number(pageNo) - 1}
          // onKeyDown={onKeyDown}
          // onClick={nextPage}
          // onContextMenu={prevPage}
        />
      </Layout>
      {/* <ContentSnackBar
        open={message === MESSAGE.FIRST_CHAPTER || message === MESSAGE.LAST_CHAPTER}
        message={message}
        onClose={onClose}
      />
      <ConfirmDialog
        open={message === MESSAGE.PREV_CHAPTER || message === MESSAGE.NEXT_CHAPTER}
        message={message}
        onClose={onClose}
        onConfirm={() => {
          message === MESSAGE.PREV_CHAPTER && prevChapter();
          message === MESSAGE.NEXT_CHAPTER && nextChapter();
        }}
      /> */}
    </>
  );
}

export const Content = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContentComponent)
);
