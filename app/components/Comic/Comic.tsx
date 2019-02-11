import React from 'react';
import Previous from '@material-ui/icons/ArrowBack';
import Star from '@material-ui/icons/StarRounded';
import { Layout } from '../Layout';
import { ComicData } from '../../../typing';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';

export interface ComicProps {
  comicData: ComicData;
}

export function Comic({ chapters, comicID, ...comicHeader }: ComicData) {
  return (
    <Layout
      className="comic"
      sidebarIcons={[
        Star,
        {
          component: Previous,
          onClick() {
            console.log('HI');
          }
        }
      ]}
    >
      <ComicHeader {...comicHeader} />
      <ComicChapters comicID={comicID} chapters={chapters} />
    </Layout>
  );
}
