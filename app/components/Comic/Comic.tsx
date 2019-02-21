import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Previous from '@material-ui/icons/ArrowBack';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';
import { BookmarkBtn } from '../BookmarkBtn';
import { ComicData } from '../../../typing';

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
          history.push('/');
        }
      },
      {
        component: BookmarkBtn,
        comicID
      }
    ];

    return (
      <Layout className="comic" sidebarIcons={sidebarIcons}>
        <ComicHeader {...comicHeaderProps} />
        <ComicChapters
          comicID={comicID}
          chapters={chapters}
          adultOnly={adultOnly}
        />
      </Layout>
    );
  }
);
