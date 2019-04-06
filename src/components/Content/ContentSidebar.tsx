import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {
  RouteComponentProps,
  withRouter,
  generatePath
} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import SkipNextIcon from '@material-ui/icons/SkipNextRounded';
import { Sidebar, SidebarIcon } from '../Sidebar';
import { BookmarkBtn } from '../BookmarkBtn';
import { PageNoButton } from './PageNoButton';
import { ContentSnackBar } from './ContentSnackBar';
import {
  RootState,
  ContentState,
  ImagesState,
  ImageActionCreators
} from '../../store';
import { PATHS } from '../../constants';
import MESSAGE from './message.json';

interface MatchParams {
  comicID: string;
  pageNo: string;
}

const mapStateToProps = ({ content, images }: RootState) => ({
  ...content,
  ...images
});

const mapDispatcthToProps = (dispatch: Dispatch) =>
  bindActionCreators(ImageActionCreators, dispatch);

const FlexSpacer = () => <div style={{ flex: '1 1 auto' }} />;

const BaseComponent = ({
  match,
  nextId,
  history,
  fitToPage,
  totalPage,
  toggleFitToPage
}: RouteComponentProps<MatchParams> &
  ContentState &
  ImagesState &
  typeof ImageActionCreators) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const comicPath = useMemo(
    () =>
      generatePath(PATHS.COMIC, {
        ...match.params
      }),
    [match.params]
  );

  const nextChapterPath = useMemo(
    () =>
      generatePath(PATHS.CONTENT, {
        ...match.params,
        pageNo: 1,
        chapterID: nextId
      }),
    [match.params, nextId]
  );

  return (
    <>
      <Sidebar className="content-page-sidebar">
        <SidebarIcon Icon={ArrowBackIcon} tooltip="返回章節" to={comicPath} />
        <SidebarIcon
          Icon={SkipNextIcon}
          tooltip="下一集"
          onClick={() =>
            nextId ? history.push(nextChapterPath) : setShowSnackBar(true)
          }
        />
        <BookmarkBtn comicID={match.params.comicID} />
        <SidebarIcon
          active={fitToPage}
          Icon={AspectRatioIcon}
          tooltip={fitToPage ? '預設大小' : '適合頁面'}
          onClick={() => toggleFitToPage()}
        />
        <SidebarIcon Component={FlexSpacer} />
        <SidebarIcon
          Component={PageNoButton}
          currentPageNo={match.params.pageNo}
          totalPage={totalPage}
        />
      </Sidebar>
      <ContentSnackBar
        open={showSnackBar}
        message={MESSAGE.LAST_CHAPTER}
        onClose={() => setShowSnackBar(false)}
      />
    </>
  );
};

export const ContentSidebar = withRouter(
  connect(
    mapStateToProps,
    mapDispatcthToProps
  )(BaseComponent)
);
