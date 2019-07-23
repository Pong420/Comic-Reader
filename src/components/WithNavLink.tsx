import React, { ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface WithNavLinkProps extends Partial<NavLinkProps> {
  children?: ReactNode;
}

export function WithNavLink({
  to,
  children,
  className,
  ...props
}: WithNavLinkProps) {
  if (to) {
    return (
      <NavLink {...props} to={to} className={className}>
        {children}
      </NavLink>
    );
  }

  return <div className={className}>{children}</div>;
}
