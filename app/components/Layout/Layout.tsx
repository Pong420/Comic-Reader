import React, { ReactNode, useRef } from 'react';
import { Sidebar } from '../Sidebar';
import { SidebarIcons } from '../../../typing';

export interface LayoutProps {
  className?: string;
  contentProps?: any;
  children?: ReactNode;
  sidebarIcons?: SidebarIcons;
  [key: string]: any;
}

export function Layout({
  className = "",
  children,
  contentProps,
  sidebarIcons,
  ...props
}: LayoutProps) {
  const contentElRef = useRef(null);

  return (
    <div className={`layout ${className}`} {...props}>
      <Sidebar Icons={sidebarIcons} />
      <div className="content" ref={contentElRef} {...contentProps}>
        {children}
      </div>
    </div>
  );
}
