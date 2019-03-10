import React, { ReactNode, DOMAttributes, forwardRef, Ref } from 'react';
import { ApiError } from 'typing';
import { Loading } from '../Loading';
import { Error } from '../Error';

export interface LayoutProps {
  className?: string;
  contentProps?: DOMAttributes<HTMLDivElement>;
  children?: ReactNode;
  loading?: boolean;
  error?: ApiError | null;
}

function LayoutComponent(
  {
    className = '',
    children,
    contentProps,
    loading,
    error,
    ...props
  }: LayoutProps,
  ref: Ref<HTMLDivElement>
) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error {...error} />;
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
