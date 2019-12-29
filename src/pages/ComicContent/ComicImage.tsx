import React from 'react';
import { Schema$ImageDetail } from '../../typings';

interface Props extends Schema$ImageDetail {
  hidden?: boolean;
}

export const ComicImage = React.memo(
  ({ src, loaded, error, width, height, hidden }: Props) => {
    return (
      <div className="comic-image" hidden={hidden} style={{ width, height }}>
        {error ? 'FAIL' : loaded ? <img src={src} alt={src} /> : 'LOADING...'}
      </div>
    );
  }
);
