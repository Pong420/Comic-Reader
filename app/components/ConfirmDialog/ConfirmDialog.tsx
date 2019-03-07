import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    title: {
      color: '#fff'
    },
    content: {
      color: '#fff'
    }
  });

export interface ConfirmDialogProps {
  msg: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmDialogComponent({
  msg,
  open,
  onConfirm,
  onClose,
  classes
}: ConfirmDialogProps & WithStyles<typeof styles>) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText classes={{ root: classes.content }}>
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          取消
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="secondary"
          autoFocus
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const ConfirmDialog = withStyles(styles)(ConfirmDialogComponent);