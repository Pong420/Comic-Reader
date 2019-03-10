import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Previous from '@material-ui/icons/ArrowBack';
import { Sidebar, SidebarIcon } from '../../Sidebar';
import { PageNoButton } from '../PageNoButton';
import { BookmarkBtn } from '../../BookmarkBtn';
import { RootState, ContentState } from '../../../store';

interface MatchParams {
  comicID: string;
  pageNo: string;
}

function mapStateToProps({ content }: RootState) {
  return { ...content };
}

const FlexSpacer = () => <div style={{ flex: '1 1 auto' }} />;

export const ContentSidebar = connect(mapStateToProps)(
  ({
    match,
    history,
    totalPage
  }: RouteComponentProps<MatchParams> & ContentState) => {
    return (
      <Sidebar className="content-page-sidebar">
        <SidebarIcon
          Icon={Previous}
          tooltip="返回章節"
          onClick={() => history.push(`/comic/${match.params.comicID}`)}
        />
        <BookmarkBtn comicID={match.params.comicID} />
        <SidebarIcon Component={FlexSpacer} />
        <SidebarIcon
          Component={PageNoButton}
          currentPageNo={match.params.pageNo}
          totalPage={totalPage}
        />
      </Sidebar>
    );
  }
);
