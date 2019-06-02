import React, { ReactElement } from 'react';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

export interface WithTooltipProps extends Partial<TooltipProps> {
  title?: string;
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

export function WithTooltip({ title, children, ...props }: WithTooltipProps) {
  if (title) {
    return (
      <Tooltip
        title={title}
        placement="right"
        PopperProps={PopperProps}
        disableFocusListener
        {...props}
      >
        {children}
      </Tooltip>
    );
  }

  return children;
}
