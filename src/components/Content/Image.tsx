import React from 'react';
import { Schema$ImageDetail } from '../../typings';

interface Props extends Schema$ImageDetail {
  hidden?: boolean;
}

export function Image({ src, loaded, error, hidden }: Props) {
  return (
    <div className="image" hidden={hidden}>
      {error ? 'FAIL' : loaded ? <img src={src} alt={src} /> : 'LOADING...'}
    </div>
  );
}
