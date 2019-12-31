import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridPorps } from '../../components/Grid';
import { bookmarkSelector } from '../../store';
import { PATHS } from '../../constants';

interface Props extends GridPorps {}

export function BookmarkGrid({ comicID, ...props }: Props) {
  const data = useSelector(bookmarkSelector(comicID)) || {};

  return (
    <Grid
      className="bookmark-grid"
      comicID={comicID}
      prevPath={PATHS.BOOKMARK}
      subtitleType="author"
      {...props}
      {...data}
    />
  );
}
