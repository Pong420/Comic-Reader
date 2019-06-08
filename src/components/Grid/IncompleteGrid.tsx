import React from 'react';
import { Grid, GridPorps } from './Grid';

interface Props extends GridPorps {
  onRefetch(): void;
}

export function IncompleteGrid({ onRefetch, ...props }: Props) {
  return (
    <Grid {...props} className="incomplete-grid">
      <div onClick={onRefetch} />
    </Grid>
  );
}
