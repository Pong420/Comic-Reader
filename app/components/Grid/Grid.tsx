import React from 'react';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { GridProps } from '../../../typing';

const PlaceHolder = () => {
  const width = 360;
  const height = 510;

  return (
    <ContentLoader
      height={height}
      width={width}
      speed={2}
      primaryColor="#252525"
      secondaryColor="#212121"
    >
      <rect x="2" y="-36" rx="5" ry="5" width={width} height={height} />
    </ContentLoader>
  );
};

export function Grid({ comicID, cover, name, latest }: GridProps) {
  if (comicID) {
    return (
      <Link to={`/comic/${comicID}`} className="grid">
        <div
          className="cover"
          style={{
            backgroundImage: `url(${cover})`
          }}
        />
        <div className="caption">
          <div className="name">{name}</div>
          <div className="latest">{latest}</div>
        </div>
      </Link>
    );
  }

  return <PlaceHolder />;
}
