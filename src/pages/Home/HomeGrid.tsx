import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridPorps } from '../../components/Grid';
import { comicSelector } from '../../store';

interface Props extends GridPorps {}

export function HomeGrid({ comicID, ...props }: Props) {
  const data = useSelector(comicSelector(comicID));
  return <Grid className="home-grid" comicID={comicID} {...props} {...data} />;
}
