import React, { ReactNode, DOMAttributes } from 'react';

export interface LayoutProps {
  className?: string;
  contentProps?: DOMAttributes<HTMLDivElement>;
  children?: ReactNode;
}

export function Layout({
  className = '',
  children,
  contentProps,
  ...props
}: LayoutProps) {
  return (
    <div className={`layout ${className}`} {...props}>
      <div className="content" {...contentProps}>
        {children}
      </div>
    </div>
  );
}
