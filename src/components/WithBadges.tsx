import React, { ReactElement, ReactNode } from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Badge from '@material-ui/core/Badge';
import red from '@material-ui/core/colors/red';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface WithBadgesInput {
  badage?: ReactNode;
}

export interface WithBadgesProps extends WithBadgesInput {
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
      <Badge badgeContent={1} classes={{ badge: classes.badge }} variant="dot">
        {children}
      </Badge>
    );
  }

  return children;
}

export const WithBadges = withStyles(style)(WithBadgesComponent);
