import React, { useMemo, CSSProperties } from 'react';
import { Schema$ImageDetail } from '../../typings';

interface Props extends Schema$ImageDetail {
  hidden?: boolean;
}

export function Image({ src, loaded, error, width, height, hidden }: Props) {
  const style = useMemo<CSSProperties>(() => ({ width, height }), [
    width,
    height
  ]);

  return (
    <div className="image" hidden={hidden} style={style}>
      {error ? 'FAIL' : loaded ? <img src={src} alt={src} /> : 'LOADING...'}
    </div>
  );
}
