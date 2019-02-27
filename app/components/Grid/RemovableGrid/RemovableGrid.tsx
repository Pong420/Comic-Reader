import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { Grid, GridPorps } from '../Grid';

export interface RemovableGridProps extends GridPorps {
  onRemove: (comicID: string) => void;
}

export function RemovableGrid({ onRemove, ...gridProps }: RemovableGridProps) {
  return (
    <Grid
      {...gridProps}
      className="removable-grid"
      gridHeader={
        <IconButton onClick={() => onRemove(gridProps.comicID)}>
          <DeleteIcon color="primary" />
        </IconButton>
      }
    />
  );
}
