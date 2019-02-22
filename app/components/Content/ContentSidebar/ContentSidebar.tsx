import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Previous from '@material-ui/icons/ArrowBack';
import { Sidebar, SidebarIcon } from '../../Sidebar';
import { PageNoButton } from '../PageNoButton';
import { ContentState } from '../../../reducers/content';

interface MatchParams {
  comicID: string;
  pageNo: string;
}

function mapStateToProps({ content }) {
  return {
    ...content
  };
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
          onClick={() => history.push(`/comic/${match.params.comicID}`)}
        />
        <SidebarIcon Icon={FlexSpacer} />
        <SidebarIcon
          Icon={PageNoButton}
          pageNo={match.params.pageNo}
          totalPage={totalPage}
        />
      </Sidebar>
    );
  }
);
