import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import * as H from 'history';

export interface WithNavLinkInput {
  to?: H.LocationDescriptor;
}

export interface WithNavLinkProps extends WithNavLinkInput {
  children: ReactElement<any>;
  activeClassName?: string;
}

export function WithNavLink({
  to,
  activeClassName,
  children
}: WithNavLinkProps) {
  if (to) {
    return (
      <NavLink to={to} activeClassName={activeClassName} exact>
        {children}
      </NavLink>
    );
  }

  return children;
}
