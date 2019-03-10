import React, { ReactNode, DOMAttributes, forwardRef, Ref } from 'react';
import { Loading } from '../Loading';

export interface LayoutProps {
  className?: string;
  contentProps?: DOMAttributes<HTMLDivElement>;
  children?: ReactNode;
  loading?: boolean;
}

function LayoutComponent(
  { className = '', children, contentProps, loading, ...props }: LayoutProps,
  ref: Ref<HTMLDivElement>
) {
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`layout ${className}`} {...props}>
      <div className="content" {...contentProps} ref={ref}>
        {children}
      </div>
    </div>
  );
}

export const Layout = forwardRef(LayoutComponent);
