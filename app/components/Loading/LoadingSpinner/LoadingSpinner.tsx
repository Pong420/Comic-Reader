import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface LoadingSpinnerProps {
  size?: number;
}

export function LoadingSpinner({ size = 50 }: LoadingSpinnerProps) {
  return <CircularProgress size={size} color="secondary" />;
}
