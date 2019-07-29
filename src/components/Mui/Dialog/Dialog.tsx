import React, { useMemo, ReactNode } from 'react';
import MuiDialog, {
  DialogProps as DefaultDialogProps
} from '@material-ui/core/Dialog';
import mergeWith from 'lodash.mergewith';

export interface DialogProps extends DefaultDialogProps {
  title?: string;
  actions?: ReactNode;
  onClose(): void;
}

const backdropProps = { classes: { root: 'mui-dialog-backdrop' } };

export function Dialog({
  title,
  actions,
  children,
  onClose,
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
      onClose={onClose}
      classes={mergedClasses}
      BackdropProps={backdropProps}
      {...props}
    >
      <div className="dialog-body">
        <h3 className="dialog-title">{title}</h3>
        <div className="dialog-content">{children}</div>
        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </MuiDialog>
  );
}
