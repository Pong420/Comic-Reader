import React, { ReactElement, ReactNode } from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Badge, { BadgeProps } from '@material-ui/core/Badge';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import red from '@material-ui/core/colors/red';

export interface WithBadgesProps extends BadgeProps {
  badage?: ReactNode;
  children: ReactElement<SvgIconProps>;
}

const style = () => {
  return createStyles({
    badge: {
      backgroundColor: red[500],
      top: 3
    }
  });
};

function WithBadgesComponent({
  badage,
  children,
  classes
}: WithBadgesProps & WithStyles<typeof style>) {
  if (badage) {
    return (
      <Badge badgeContent={1} classes={classes} variant="dot">
        {children}
      </Badge>
    );
  }

  return children;
}

export const WithBadges = withStyles(style)(WithBadgesComponent);
