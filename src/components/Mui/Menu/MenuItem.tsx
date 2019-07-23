import React, { useCallback, MouseEvent, ComponentType } from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import MuiMenuItem from '@material-ui/core/MenuItem';

type DefaultMenuItemProps = Parameters<typeof MuiMenuItem>[0];

export interface MenuItemProps extends DefaultMenuItemProps {
  icon?: ComponentType<SvgIconProps>;
}

interface Props {
  onClose(): void;
}

export function MenuItem({
  selected,
  children,
  onClick,
  onClose,
  icon: Icon,
  ...props
}: Props & MenuItemProps) {
  const onClickCallback = useCallback(
    (evt: MouseEvent<HTMLLIElement>) => {
      onClose();
      onClick && onClick(evt);
    },
    [onClick, onClose]
  );

  return (
    <MuiMenuItem
      className="mui-menu-item"
      selected={selected}
      onClick={onClickCallback}
      {...props}
    >
      {Icon && <Icon />}
      <div className="mui-menu-item-content">{children}</div>
    </MuiMenuItem>
  );
}

export function useMuiMenuItem({ onClose }: Props) {
  return useCallback(
    (props: MenuItemProps) => <MenuItem onClose={onClose} {...props} />,
    [onClose]
  );
}
