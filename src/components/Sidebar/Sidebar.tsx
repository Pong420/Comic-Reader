import React, { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Sidebar({ className = '', children }: Props) {
  return (
    <div className={`sidebar ${className}`.trim()}>
      <div />
      {children}
    </div>
  );
}
