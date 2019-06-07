import React from 'react';
import { Schema$ImageDetail } from '../../typings';

interface Props extends Schema$ImageDetail {
  hidden?: boolean;
}

export function Image({ src, loaded, hidden }: Props) {
  return (
    <div className="image" hidden={hidden}>
      {loaded && <img src={src} alt={src} />}
    </div>
  );
}
