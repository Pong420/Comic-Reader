import React, { ReactNode } from 'react';

interface SidebarProps {
  children?: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return <div className="sidebar">{children}</div>;
}
