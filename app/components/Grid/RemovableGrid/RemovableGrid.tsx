import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { Grid, GridPorps } from '../Grid';

export interface RemovableGridProps extends GridPorps {
  onClose: (comicID: string) => void;
}

export function RemovableGrid({ onClose, ...props }: RemovableGridProps) {
  return (
    <Grid
      {...props}
      className="removable-grid"
      gridHeader={
        <IconButton onClick={() => onClose(props.comicID)}>
          <DeleteIcon color="primary" />
        </IconButton>
      }
    />
  );
}
