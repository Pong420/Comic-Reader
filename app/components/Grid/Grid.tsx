import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { GridData } from '../../../typing';

export interface GridPorps extends GridData {
  className?: string;
  gridHeader?: ReactNode;
}

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

export function Grid({
  comicID,
  cover,
  name,
  latest,
  className = '',
  gridHeader
}: GridPorps) {
  if (comicID) {
    return (
      <div className={`grid ${className}`.trim()}>
        <div className="grid-content">
          <div className="grid-header">{gridHeader}</div>
          <Link to={`/comic/${comicID}`}>
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
        </div>
      </div>
    );
  }

  return <PlaceHolder />;
}
