import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRxAsync } from 'use-rx-hooks';
import { ComicDetailsHeader } from './ComicDetailsHeader';
import { ComicDetailsContent } from './ComicDetailsContent';
import { useMouseTrap } from '../../hooks/useMouseTrap';
import { getComicDetails } from '../../service';
import { PATHS } from '../../constants';

interface MatchParams {
  comicID: string;
  chapterType?: string;
}

export function ComicDetails({
  match,
  location,
  history
}: RouteComponentProps<MatchParams, {}, { prevPath: string } | undefined>) {
  const prevPath = location.state && location.state.prevPath;
  const { run, data } = useRxAsync(getComicDetails, { defer: true });
  const { comicID, chapterType } = match.params;

  useEffect(() => {
    run({ comicID });
  }, [run, comicID]);

  useMouseTrap('esc', () => history.push(prevPath || PATHS.HOME));

  return (
    <div className="comic-details">
      <ComicDetailsHeader {...data} />
      <ComicDetailsContent
        comicID={comicID}
        chapterType={chapterType}
        chapters={data ? data.chapters : { byTypes: {}, types: [] }}
      />
    </div>
  );
}
