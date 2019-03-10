import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';
import { useRestoreScrollPostion } from '../../utils/useRestoreScrollPostion';
import { RootState, ComicState } from '../../store';

function mapStateToProps({ comic }: RootState, ownProps: any) {
  return { ...comic, ...ownProps };
}

function ComicComponent({ comicData, loading }: ComicState) {
  const contentElRef = useRef<HTMLDivElement>(null);
  const { adultOnly, chapters, comicID, ...comicHeaderProps } = comicData;

  useRestoreScrollPostion(contentElRef, comicID);

  return (
    <Layout className="comic" ref={contentElRef} loading={loading}>
      <ComicHeader {...comicHeaderProps} />
      <ComicChapters
        comicID={comicID}
        chapters={chapters}
        adultOnly={adultOnly}
      />
    </Layout>
  );
}

export const Comic = connect(mapStateToProps)(ComicComponent);
