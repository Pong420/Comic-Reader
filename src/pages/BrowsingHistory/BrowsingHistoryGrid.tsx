import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridPorps } from '../../components/Grid';
import { browsingHistorySelector } from '../../store';
import { PATHS } from '../../constants';

interface Props extends GridPorps {}

export function BrowsingHistoryGrid({ comicID, ...props }: Props) {
  const { chapterID, ...data } =
    useSelector(browsingHistorySelector(comicID)) || {};

  return (
    <Grid
      className="browsing-history-grid"
      comicID={comicID}
      prevPath={PATHS.BROWSING_HISTORY}
      subtitleType="author"
      {...props}
      {...data}
    />
  );
}
