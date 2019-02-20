import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Previous from '@material-ui/icons/ArrowBack';
import { Layout } from '../Layout';
import { ComicData } from '../../../typing';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';

export const Comic = withRouter(
  ({
    history,
    adultOnly,
    chapters,
    comicID,
    ...comicHeaderProps
  }: ComicData & RouteComponentProps) => {
    const sidebarIcons = [
      {
        component: Previous,
        onClick() {
          if (history.action === 'POP') {
            history.push('/');
          } else {
            history.goBack();
          }
        }
      }
    ];

    return (
      <Layout className="comic" sidebarIcons={sidebarIcons}>
        <ComicHeader {...comicHeaderProps} />
        <ComicChapters
          comicID={comicID}
          adultOnly={adultOnly}
          chapters={chapters}
        />
      </Layout>
    );
  }
);
