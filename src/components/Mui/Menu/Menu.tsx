import React, { useMemo, forwardRef } from 'react';
import Popover, { PopoverProps } from '@material-ui/core/Popover';
import mergeWith from 'lodash.mergewith';

export interface MenuProps extends PopoverProps {
  onClose(): void;
}

const backdropProps = {
  classes: { root: 'mui-menu-backdrop' },
  invisible: true
};

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ classes, children, PaperProps, ...props }, ref) => {
    const mergedClasses = useMemo<PopoverProps['classes']>(
      () =>
        mergeWith({ paper: 'mui-menu-paper' }, classes, (a, b) => a + ' ' + b),
      [classes]
    );

    // const mergedPaperProps = useMemo(
    //   () =>
    //     mergeWith(
    //       {
    //         style: {
    //           boxShadow: `0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)`
    //         }
    //       },
    //       PaperProps
    //     ),
    //   [PaperProps]
    // );

    return (
      <Popover
        classes={mergedClasses}
        BackdropProps={backdropProps}
        ref={ref}
        {...props}
      >
        <div className="mui-menu-content">{children}</div>
      </Popover>
    );
  }
);
