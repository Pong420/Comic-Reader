import React, { ReactElement } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface WithNavLinkProps extends Partial<NavLinkProps> {
  children: ReactElement<any>;
}

export function WithNavLink({ to, children, ...props }: WithNavLinkProps) {
  if (to) {
    return (
      <NavLink to={to} {...props}>
        {children}
      </NavLink>
    );
  }

  return children;
}
