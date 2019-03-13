import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicChapters } from './ComicChapters';
import { useRestoreScrollPosition } from '../../utils/useRestoreScrollPosition';
import { RootState, ComicState } from '../../store';

interface MatchParams {
  comicID: string;
}

function mapStateToProps({ comic }: RootState, ownProps: any) {
  return { ...comic, ...ownProps };
}

function ComicComponent({
  comicData,
  loading,
  error,
  match
}: ComicState & RouteComponentProps<MatchParams>) {
  const contentElRef = useRef<HTMLDivElement>(null);
  const { adultOnly, chapters, ...comicHeaderProps } = comicData;
  const { comicID } = match.params;

  useRestoreScrollPosition(contentElRef, comicID, [loading]);

  return (
    <Layout
      className="comic"
      ref={contentElRef}
      loading={loading}
      error={error}
    >
      <ComicHeader {...comicHeaderProps} />
      <ComicChapters
        comicID={comicID}
        chapters={chapters}
        adultOnly={adultOnly}
      />
    </Layout>
  );
}

export const Comic = withRouter(connect(mapStateToProps)(ComicComponent));
