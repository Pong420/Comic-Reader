import React from 'react';
import { Layout } from '../Layout';
import { LoadingSpinner } from './LoadingSpinner';

export function Loading() {
  return (
    <Layout className="loading">
      <LoadingSpinner />
    </Layout>
  );
}
