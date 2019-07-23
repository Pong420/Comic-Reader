import React, { useMemo } from 'react';
import { IconButton } from '../IconButton';
import MuiSnackbar, {
  SnackbarProps as DefaultSnackbarProps
} from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import mergeWith from 'lodash.mergewith';

export interface SnackbarProps extends DefaultSnackbarProps {
  onClose: () => void;
}

const anchorOrigin: SnackbarProps['anchorOrigin'] = {
  vertical: 'bottom',
  horizontal: 'center'
};

export function Snackbar({ classes, ...props }: SnackbarProps) {
  const mergedClasses = useMemo(
    () =>
      mergeWith(
        {
          root: 'mui-snackbar'
        },
        classes,
        (a, b) => a + ' ' + b
      ),
    [classes]
  );

  return (
    <MuiSnackbar
      classes={mergedClasses}
      anchorOrigin={anchorOrigin}
      autoHideDuration={3000}
      action={[
        <IconButton key="close" icon={CloseIcon} onClick={props.onClose} />
      ]}
      {...props}
    />
  );
}
