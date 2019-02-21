import React from 'react';
import { RouteComponentProps } from 'react-router';
import Previous from '@material-ui/icons/ArrowBack';
import { Sidebar, SidebarIcon } from '../../Sidebar';

interface MatchParams {
  comicID: string;
  pageNo: string;
}

const FlexSpacer = () => <div style={{ flex: '1 1 auto' }} />;

// FIXME:
const PageNoButton = ({ className, pageNo, ...props }: any) => {
  console.log(className);

  return (
    <div className={`${className} page-no-button`} {...props}>
      <sup>{Number(pageNo) + 1}</sup> / <sub>99</sub>
    </div>
  );
};

export function ContentSidebar({
  match,
  history
}: RouteComponentProps<MatchParams>) {
  return (
    <Sidebar className="content-page-sidebar">
      <SidebarIcon
        Icon={Previous}
        onClick={() => history.push(`/comic/${match.params.comicID}`)}
      />
      <SidebarIcon Icon={FlexSpacer} />
      <SidebarIcon Icon={PageNoButton} pageNo={match.params.pageNo} />
    </Sidebar>
  );
}
