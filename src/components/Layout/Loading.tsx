import React from 'react';
import CircularProgress, {
  CircularProgressProps
} from '@material-ui/core/CircularProgress';

export function Loading(props: CircularProgressProps) {
  return (
    <div className="loading">
      <CircularProgress className="loading-spinner" {...props} />
    </div>
  );
}
