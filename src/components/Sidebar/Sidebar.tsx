import React, { ReactNode } from 'react';
import { classes } from '../../utils/classes';

interface Props {
  className: string;
  children: ReactNode;
}

export function Sidebar({ className, children }: Props) {
  return <div className={classes('sidebar', className)}>{children}</div>;
}
