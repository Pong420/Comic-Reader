import React, { ReactElement } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export interface WithTooltipInput {
  tooltip?: string;
}

interface WithTooltipProps extends WithTooltipInput {
  children: ReactElement<any>;
}

const PopperProps = {
  popperOptions: {
    modifiers: {
      offset: {
        fn: (data: any) => {
          data.offsets.popper.left = 50;
          return data;
        }
      }
    }
  }
};

export function WithTooltip({ tooltip, children }: WithTooltipProps) {
  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement="right" PopperProps={PopperProps} disableFocusListener>
        {children}
      </Tooltip>
    );
  }

  return children;
}
