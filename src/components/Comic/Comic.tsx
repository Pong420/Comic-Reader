import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicContent } from './ComicContent';
import { RootState, getComicData } from '../../store';

interface MatchParams {
  comicID: string;
  chapterType?: string;
}

const mapStateToProps = (state: RootState) => {
  const { error, loading, ...comicData } = state.comicData;
  return { comicData, error, loading };
};

interface Props extends RouteComponentProps<MatchParams> {}

export function ComicComponent({
  dispatch,
  match,
  error,
  loading,
  comicData
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const { comicID, chapterType } = match.params;

  // TODO: Add esc hot key

  useEffect(() => {
    dispatch(getComicData(comicID));
  }, [comicID, dispatch]);

  return (
    <Layout error={error} loading={loading}>
      <div className="comic">
        <ComicHeader {...comicData} />
        {!!comicData.chapters && (
          <ComicContent
            comicID={comicID}
            chapterType={chapterType}
            chapters={comicData.chapters}
          />
        )}
      </div>
    </Layout>
  );
}

export const Comic = connect(mapStateToProps)(ComicComponent);
