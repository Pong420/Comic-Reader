import React, { useCallback } from 'react';
import { Dialog, DialogProps } from './';
import Button from '@material-ui/core/Button';

interface Props extends DialogProps {
  onConfirm(): any;
  autoFocusConfirmButon?: boolean;
}

export function ConfirmDialog({
  onClose,
  onConfirm,
  autoFocusConfirmButon = true,
  ...props
}: Props) {
  const confirmCallback = useCallback(() => {
    if (onConfirm() !== false) {
      onClose();
    }
  }, [onClose, onConfirm]);

  return (
    <Dialog
      {...props}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose}>取消</Button>
          <Button onClick={confirmCallback} autoFocus={autoFocusConfirmButon}>
            確定
          </Button>
        </>
      }
    />
  );
}
