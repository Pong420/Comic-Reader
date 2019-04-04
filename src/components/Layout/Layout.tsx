import React, { ReactNode, forwardRef, Ref } from 'react';
// import { Loading } from '../Loading';
// import { Error } from '../Error';
import { ApiError } from '../../typings';

export interface LayoutProps {
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  error?: ApiError | null;
}

function LayoutComponent(
  { className = '', children, loading, error, ...props }: LayoutProps,
  ref: Ref<HTMLDivElement>
) {
  if (error) {
    // return <Error {...error} />;
  }

  if (loading) {
    // return <Loading />;
  }

  return (
    <div className={`layout ${className}`} {...props}>
      <div className="content" ref={ref}>
        {children}
      </div>
    </div>
  );
}

export const Layout = forwardRef(LayoutComponent);
