import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { Grid, GridPorps } from '../Grid';

export interface RemovableGridProps extends GridPorps {
  removable: boolean;
  onRemove: (comicID: string) => void;
}

export function RemovableGrid({
  removable = false,
  onRemove,
  ...gridProps
}: RemovableGridProps) {
  return (
    <Grid {...gridProps} className="removable-grid">
      {removable && (
        <div className="wrapper" onClick={() => onRemove(gridProps.comicID)}>
          <DeleteIcon color="primary" />
          <div style={{ marginTop: 10 }}>點擊即可刪除紀錄</div>
        </div>
      )}
    </Grid>
  );
}
