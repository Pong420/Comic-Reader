import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRxAsync } from 'use-rx-hooks';
import { ComicDetailsHeader } from './ComicDetailsHeader';
import { ComicDetailsContent } from './ComicDetailsContent';
import { getComicDetails } from '../../service';

interface MatchParams {
  comicID: string;
  chapterType?: string;
}

interface RouteState {
  prevPath?: string;
}

interface Props extends RouteComponentProps<MatchParams, {}, RouteState> {}

export function ComicDetails({ match }: Props) {
  const { run, data } = useRxAsync(getComicDetails, { defer: true });
  const { comicID } = match.params;

  useEffect(() => {
    run({ comicID });
  }, [run, comicID]);

  return (
    <div className="comic-details">
      <ComicDetailsHeader {...data} />
      <ComicDetailsContent
        comicID={comicID}
        chapters={data ? data.chapters : { byTypes: {}, types: [] }}
      />
    </div>
  );
}
