import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridPorps } from '../../components/Grid';
import { searchResultSelector } from '../../store';
import { PATHS } from '../../constants';

interface Props extends GridPorps {}

export function SearchResultGrid({ comicID, ...props }: Props) {
  const data = useSelector(searchResultSelector(comicID));
  return (
    <Grid
      className="search-result-grid"
      comicID={comicID}
      prevPath={PATHS.SEARCH}
      {...props}
      {...data}
    />
  );
}
