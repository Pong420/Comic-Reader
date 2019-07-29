import React, { useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicContent } from './ComicContent';
import { RootState, getComicData } from '../../store';
import { useMouseTrap } from '../../utils/useMouseTrap';
import { PATHS } from '../../constants';
import shortcuts from './shortcuts.json';

interface MatchParams {
  comicID: string;
  chapterType?: string;
}

interface RouteState {
  prevPath?: string;
}

interface Props extends RouteComponentProps<MatchParams, {}, RouteState> {}

const mapStateToProps = (state: RootState, { match }: Props) => {
  const { error, loading, chapters, adultOnly, ...comicData } = state.comicData;
  const visited = state.browsingHistory.byIds[match.params.comicID];

  let chapterType = match.params.chapterType;

  if (!chapterType && chapters && visited) {
    const { byTypes } = chapters;
    for (const type in byTypes) {
      if (byTypes[type].includes(visited.chapterID)) {
        chapterType = type;
      }
    }
  }

  return {
    error,
    loading,
    adultOnly,
    comicData,
    chapters,
    chapterType
  };
};

export function ComicComponent({
  dispatch,
  error,
  loading,
  match,
  adultOnly,
  chapters,
  comicData,
  chapterType,
  history,
  location
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const prevPath = location.state && location.state.prevPath;
  const { comicID } = match.params;

  const goBack = useCallback(() => {
    history.push(prevPath || PATHS.HOME);
  }, [history, prevPath]);

  useEffect(() => {
    dispatch(getComicData(comicID));
  }, [comicID, dispatch]);

  useMouseTrap(shortcuts.goback.keys, goBack);

  return (
    <Layout error={error} loading={loading}>
      <div className="comic">
        <ComicHeader {...comicData} />
        {!!chapters && (
          <ComicContent
            adultOnly={adultOnly}
            comicID={comicID}
            chapters={chapters}
            chapterType={chapterType}
          />
        )}
      </div>
    </Layout>
  );
}

export const Comic = connect(mapStateToProps)(ComicComponent);
