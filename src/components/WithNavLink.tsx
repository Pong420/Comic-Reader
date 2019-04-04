import React, { ReactElement } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface WithNavLinkInput {
  to?: NavLinkProps['to'];
}

export interface WithNavLinkProps extends WithNavLinkInput {
  children: ReactElement<any>;
  activeClassName?: string;
}

export function WithNavLink({ to, activeClassName, children }: WithNavLinkProps) {
  if (to) {
    return (
      <NavLink to={to} activeClassName={activeClassName} exact>
        {children}
      </NavLink>
    );
  }

  return children;
}
