import React, { ComponentType } from 'react';
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
  isActive?: boolean;
  icon?: ComponentType<SvgIconProps>;
  iconProps?: SvgIconProps;
}

const activeClassName = 'mui-icon-button-active';

export const IconButton = React.memo(
  ({
    icon: Icon,
    iconProps,
    className = '',
    isActive,
    to,
    title,
    badage,
    ...props
  }: Props) => {
    if (Icon) {
      return (
        <WithNavLink to={to} activeClassName={activeClassName} exact>
          <WithTooltip title={title}>
            <MuiIconButton
              {...props}
              className={classes(
                'mui-icon-button',
                className,
                isActive && activeClassName
              )}
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
);
