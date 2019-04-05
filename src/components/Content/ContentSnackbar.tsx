import React from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export interface ContentSnackBarProps extends SnackbarProps {
  onClose: () => void;
}

export function ContentSnackBar({ ...props }: ContentSnackBarProps) {
  return (
    <Snackbar
      {...props}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      autoHideDuration={2000}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}
