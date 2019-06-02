import React, { ComponentType, ReactElement } from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { WithTooltip, WithTooltipProps } from '../../WithTooltip';
import { WithNavLink, WithNavLinkProps } from '../../WithNavLink';
import { WithBadges, WithBadgesProps } from '../../WithBadges';
import { classes } from '../../../utils/classes';
import MuiIconButton, { IconButtonProps } from '@material-ui/core/IconButton';

interface Props
  extends Partial<IconButtonProps>,
    Pick<WithNavLinkProps, 'to'>,
    Pick<WithTooltipProps, 'title'>,
    Pick<WithBadgesProps, 'badage'> {
  icon?: ComponentType<SvgIconProps>;
  iconProps?: SvgIconProps;
  children?: ReactElement;
}

export function IconButton({
  icon: Icon,
  iconProps,
  children,
  className = '',
  to,
  title,
  badage,
  ...props
}: Props) {
  if (Icon) {
    return (
      <WithNavLink to={to} activeClassName="mui-icon-button-active">
        <WithTooltip title={title}>
          <MuiIconButton
            {...props}
            className={classes('mui-icon-button', className)}
          >
            <WithBadges badage={badage}>
              <Icon {...iconProps} />
            </WithBadges>
          </MuiIconButton>
        </WithTooltip>
      </WithNavLink>
    );
  }

  return null;
}
