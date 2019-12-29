import React, { ComponentType, SVGProps } from 'react';
import { Classes } from '@blueprintjs/core';

export interface MuiIconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function MuiIcon({ icon: Icon }: MuiIconProps) {
  return (
    <span className={Classes.ICON}>
      <Icon />
    </span>
  );
}
