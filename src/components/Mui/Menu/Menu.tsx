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

    return (
      <Popover
        classes={mergedClasses}
        BackdropProps={backdropProps}
        ref={ref}
        {...props}
      >
        <div className="mui-menu-content" ref={ref}>
          {children}
        </div>
      </Popover>
    );
  }
);
