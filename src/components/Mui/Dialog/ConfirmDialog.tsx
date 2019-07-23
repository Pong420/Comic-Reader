import React, { useCallback } from 'react';
import { Dialog, DialogProps } from './';
import Button from '@material-ui/core/Button';

interface Props extends DialogProps {
  handleConfirm(): any;
  autoFocusConfirmButon?: boolean;
}

export function ConfirmDialog({
  handleClose,
  handleConfirm,
  autoFocusConfirmButon = true,
  ...props
}: Props) {
  const confirmCallback = useCallback(() => {
    if (handleConfirm() !== false) {
      handleClose();
    }
  }, [handleClose, handleConfirm]);

  return (
    <Dialog
      {...props}
      handleClose={handleClose}
      actions={
        <>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={confirmCallback} autoFocus={autoFocusConfirmButon}>
            確定
          </Button>
        </>
      }
    />
  );
}
