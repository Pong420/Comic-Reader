import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps, withRouter, generatePath } from 'react-router';
import Previous from '@material-ui/icons/ArrowBack';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import SkipNextIcon from '@material-ui/icons/SkipNextRounded';
import { Sidebar, SidebarIcon } from '../../Sidebar';
import { PageNoButton } from '../PageNoButton';
import {
  RootState,
  ContentState,
  ImagesState,
  ImageActionCreators
} from '../../../store';
import PATH from '../../../paths.json';

interface MatchParams {
  comicID: string;
  pageNo: string;
}

function mapStateToProps({ content, images }: RootState) {
  return { ...content, ...images };
}

function mapDispatcthToProps(dispatch: Dispatch) {
  return bindActionCreators(ImageActionCreators, dispatch);
}

const FlexSpacer = () => <div style={{ flex: '1 1 auto' }} />;

const BaseComponent = ({
  match,
  location,
  history,
  nextId,
  fitToPage,
  totalPage,
  toggleFitToPage
}: RouteComponentProps<MatchParams> &
  ContentState &
  ImagesState &
  typeof ImageActionCreators) => {
  return (
    <Sidebar className="content-page-sidebar">
      <SidebarIcon
        Icon={Previous}
        tooltip="返回章節"
        onClick={() =>
          history.push(
            generatePath(PATH.COMIC, {
              comicID: match.params.comicID
            })
          )
        }
      />
      <SidebarIcon
        active={fitToPage}
        Icon={AspectRatioIcon}
        tooltip={fitToPage ? '預設大小' : '適合頁面'}
        onClick={() => toggleFitToPage()}
      />
      <SidebarIcon Icon={SkipNextIcon} tooltip="下一集" />
      <SidebarIcon Component={FlexSpacer} />
      <SidebarIcon
        Component={PageNoButton}
        currentPageNo={match.params.pageNo}
        totalPage={totalPage}
      />
    </Sidebar>
  );
};

export const ContentSidebar = withRouter(
  connect(
    mapStateToProps,
    mapDispatcthToProps
  )(BaseComponent)
);
