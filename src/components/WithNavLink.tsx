import React, { ReactElement } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface WithNavLinkProps extends Partial<NavLinkProps> {
  children: ReactElement<any>;
}

export function WithNavLink({
  to,
  children,
  className,
  ...props
}: WithNavLinkProps) {
  if (typeof to === 'string' || (to && to.pathname)) {
    return (
      <NavLink {...props} to={to} className={className}>
        {children}
      </NavLink>
    );
  }

  return children;
}
