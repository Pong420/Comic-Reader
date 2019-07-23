import React, { useMemo, ReactNode } from 'react';
import MuiDialog, {
  DialogProps as DefaultDialogProps
} from '@material-ui/core/Dialog';
import mergeWith from 'lodash.mergewith';

export interface DialogProps extends DefaultDialogProps {
  title?: string;
  open: boolean;
  children?: ReactNode;
  actions?: ReactNode;
  handleClose(): void;
}

const backdropProps = { classes: { root: 'mui-dialog-backdrop' } };

export function Dialog({
  title,
  open,
  actions,
  children,
  handleClose,
  classes,
  ...props
}: DialogProps) {
  const mergedClasses = useMemo(
    () =>
      mergeWith(
        {
          root: 'mui-dialog',
          paper: 'mui-dialog-paper',
          paperWidthXs: 'mui-dialog-xs'
        },
        classes,
        (a, b) => a + ' ' + b
      ),
    [classes]
  );

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      classes={mergedClasses}
      BackdropProps={backdropProps}
      {...props}
    >
      <div className="dialog-body">
        <div className="dialog-title">{title}</div>
        <div className="dialog-content">{children}</div>
        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </MuiDialog>
  );
}
