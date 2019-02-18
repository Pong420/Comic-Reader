import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Layout } from '../Layout';

export interface LoadingProps {}

export function Loading({  }: LoadingProps) {
  return (
    <Layout className="loading">
      <CircularProgress size={50} color="secondary" />
    </Layout>
  );
}
