import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Previous from '@material-ui/icons/ArrowBack';
import Star from '@material-ui/icons/StarRounded';
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
    ...comicHeader
  }: ComicData & RouteComponentProps) => (
    <Layout
      className="comic"
      sidebarIcons={[
        Star,
        {
          component: Previous,
          onClick() {
            history.push('/');
          }
        }
      ]}
    >
      <ComicHeader {...comicHeader} />
      <ComicChapters
        comicID={comicID}
        adultOnly={adultOnly}
        chapters={chapters}
      />
    </Layout>
  )
);
