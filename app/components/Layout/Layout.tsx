import React, { ReactNode, DOMAttributes, forwardRef, Ref } from 'react';

export interface LayoutProps {
  className?: string;
  contentProps?: DOMAttributes<HTMLDivElement>;
  children?: ReactNode;
}

function LayoutComponent(
  { className = '', children, contentProps, ...props }: LayoutProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div className={`layout ${className}`} {...props}>
      <div className="content" {...contentProps} ref={ref}>
        {children}
      </div>
    </div>
  );
}

export const Layout = forwardRef(LayoutComponent);
