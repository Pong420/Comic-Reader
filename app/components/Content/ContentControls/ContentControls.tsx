import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';

const style = () => {
  const dimen = 47.5;

  return createStyles({
    fab: {
      marginTop: 10,
      width: dimen,
      height: dimen
    }
  });
};

const FabButton = withStyles(style)(({ classes }: WithStyles<typeof style>) => {
  return (
    <div className="fab-button">
      <Fab className={classes.fab} />
    </div>
  );
});

export function ContentControls() {
  return (
    <>
      <div className="content-header">
        <div className="content-header-content">title</div>
      </div>
      <div className="content-float-buttons">
        <div className="content-float-buttons-content">
          <FabButton />
          <FabButton />
          <FabButton />
        </div>
      </div>
    </>
  );
}
