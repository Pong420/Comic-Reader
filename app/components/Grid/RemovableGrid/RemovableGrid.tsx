import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Grid, GridPorps } from '../Grid';

export interface RemovableGridProps
  extends GridPorps,
    WithStyles<typeof styles> {
  onClose: (comicID: string) => void;
}

const styles = () =>
  createStyles({
    iconButton: {
      color: '#fff'
    }
  });

export const RemovableGrid = withStyles(styles)(
  ({ onClose, classes, ...props }: RemovableGridProps) => {
    return (
      <Grid
        {...props}
        className="removable-grid"
        gridHeader={
          <IconButton
            className={classes.iconButton}
            onClick={() => onClose(props.comicID)}
          >
            <DeleteIcon color="inherit" />
          </IconButton>
        }
      />
    );
  }
);
