import React from 'react';
import WarningIcon from '@material-ui/icons/WarningRounded';
import { ApiError } from '../../typings';

export interface ErrorProps {
  error: ApiError | boolean;
  reload?: () => void;
}

const defaultStatusText = '出現錯誤';

export function Error({ error }: ErrorProps) {
  const statusText =
    typeof error === 'object' && error.response && error.response.statusText;

  return (
    <div className="error">
      <div className="error-content">
        <WarningIcon className="warning-icon" />
        <div className="error-message">{statusText || defaultStatusText}</div>
      </div>
    </div>
  );
}
