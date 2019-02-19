import React, { ReactNode, useRef, DOMAttributes } from 'react';
import { Sidebar } from '../Sidebar';
import { SidebarIcons } from '../../../typing';

export interface LayoutProps {
  className?: string;
  contentProps?: DOMAttributes<HTMLDivElement>;
  children?: ReactNode;
  sidebarIcons?: SidebarIcons;
}

export function Layout({
  className = '',
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
