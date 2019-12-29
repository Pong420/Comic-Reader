import React, { ReactNode } from 'react';
import { AppRegion } from './AppRegion';

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Sidebar({ className, children }: Props) {
  return (
    <div className={`sidebar ${className}`.trim()}>
      <AppRegion />
      <div className="sidebar-content">{children}</div>
    </div>
  );
}
