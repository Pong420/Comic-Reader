import React, { ReactNode, isValidElement } from 'react';
import { Error } from './Error';
import { Loading } from './Loading';
import { ApiRequestStatus } from '../../typings';

export interface LayoutProps extends Partial<ApiRequestStatus> {
  children: ReactNode;
}

export function Layout({ error, loading, children }: LayoutProps) {
  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading size={50} />;
  }

  if (isValidElement(children)) {
    return children;
  }

  return null;
}
