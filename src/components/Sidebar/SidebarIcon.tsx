import React, { ComponentType } from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { WithTooltipInput, WithTooltip } from '../../components/WithTooltip';
import { WithNavLinkInput, WithNavLink } from '../../components/WithNavLink';
import { WithBadgesInput, WithBadges } from '../../components/WithBadges';

export interface SidebarIconProps extends WithNavLinkInput, WithTooltipInput, WithBadgesInput {
  Icon?: ComponentType<SvgIconProps>;
  Component?: ComponentType<any>;
  active: boolean;
  [props: string]: any;
}

const sidebarIconStyles = () => {
  const white = {
    color: '#fff'
  };

  const root = {
    width: 50,
    height: 50,
    padding: 0,
    color: '#aaa',
    '&:hover': {
      ...white,
      '& $icon': white
    }
  };

  return createStyles({
    root,
    isActive: {
      '& $icon': white
    },
    iconButton: {
      ...root
    },
    icon: {
      fontSize: 30
    }
  });
};

function SidebarIconComponent({
  to,
  tooltip,
  Icon,
  Component,
  classes,
  badage,
  active = false,
  ...props
}: SidebarIconProps & WithStyles<typeof sidebarIconStyles>) {
  const { root, iconButton, icon, isActive } = classes;

  if (Icon) {
    return (
      <WithNavLink to={to} activeClassName={isActive}>
        <WithTooltip tooltip={tooltip}>
          <IconButton className={[iconButton, active && isActive].join(' ')} {...props}>
            <WithBadges badage={badage}>
              <Icon className={icon} />
            </WithBadges>
          </IconButton>
        </WithTooltip>
      </WithNavLink>
    );
  }

  if (Component) {
    return <Component className={root} {...props} />;
  }

  return null;
}

export const SidebarIcon = withStyles(sidebarIconStyles)(SidebarIconComponent);
