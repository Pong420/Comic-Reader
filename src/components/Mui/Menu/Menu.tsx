import React, { useMemo, forwardRef } from 'react';
import MuiMenu, { MenuProps } from '@material-ui/core/Menu';
import mergeWith from 'lodash.mergewith';

const backdropProps = {
  classes: { root: 'mui-menu-backdrop' },
  invisible: true
};

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ classes, children, PaperProps, ...props }, ref) => {
    const mergedClasses = useMemo(
      () =>
        mergeWith({ paper: 'mui-menu-paper' }, classes, (a, b) => a + ' ' + b),
      [classes]
    );

    const mergedPaperProps = useMemo(
      () =>
        mergeWith(
          {
            style: {
              boxShadow: `0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)`
            }
          },
          PaperProps
        ),
      [PaperProps]
    );

    return (
      <MuiMenu
        className="mui-menu"
        classes={mergedClasses}
        disableAutoFocusItem
        PaperProps={mergedPaperProps}
        BackdropProps={backdropProps}
        {...props}
      >
        <div className="mui-menu-content" ref={ref}>
          {children}
        </div>
      </MuiMenu>
    );
  }
);
