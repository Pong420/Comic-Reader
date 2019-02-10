import React, { ReactNode, useRef } from 'react';
import { Sidebar } from '../Sidebar';

export interface LayoutProps {
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

export function Layout({ className, children, ...props }: LayoutProps) {
  const contentElRef = useRef(null);

  return (
    <div className={`layout ${className}`} {...props}>
      <Sidebar />
      <div className="content" ref={contentElRef}>
        {children}
      </div>
    </div>
  );
}
