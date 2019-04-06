import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Layout } from './Layout';

interface Props {
  size?: number;
}

export function Loading({ size = 50 }: Props) {
  return (
    <Layout className="loading">
      <CircularProgress size={size} color="secondary" />;
    </Layout>
  );
}
