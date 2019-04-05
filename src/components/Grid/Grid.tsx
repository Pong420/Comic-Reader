import React, { ReactNode } from 'react';
import { Link, generatePath } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { GridData } from '../../typings';
import { PATHS } from '../../constants';

export interface GridPorps extends GridData {
  className?: string;
  children?: ReactNode;
  isPlaceholder?: boolean;
}

function Placeholder() {
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
}

export function Grid({
  comicID,
  cover,
  name,
  latest,
  className = '',
  children,
  isPlaceholder
}: GridPorps) {
  if (comicID) {
    const to = generatePath(PATHS.COMIC, {
      comicID
    });

    return (
      <div className={`grid ${className}`.trim()}>
        <div className="grid-content">
          <Link to={to}>
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
        {children}
      </div>
    );
  }

  if (isPlaceholder) {
    return <Placeholder />;
  }

  return null;
}
