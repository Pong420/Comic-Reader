import React, { useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicContent } from './ComicContent';
import { RootState, getComicData } from '../../store';
import { useMouseTrap } from '../../utils/useMouseTrap';
import { PATHS } from '../../constants';

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
  comicData,
  history
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const { comicID, chapterType } = match.params;

  const backToHome = useCallback(() => {
    history.push(PATHS.HOME);
  }, [history]);

  useEffect(() => {
    dispatch(getComicData(comicID));
  }, [comicID, dispatch]);

  useMouseTrap('esc', backToHome);

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
