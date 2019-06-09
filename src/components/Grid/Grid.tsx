import React, { ReactNode, useMemo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Schema$GridData } from '../../typings';
import { classes } from '../../utils/classes';
import { PATHS } from '../../constants';
import ContentLoader from 'react-content-loader';

export interface GridPorps extends Partial<Schema$GridData> {
  comicID: string;
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
  const style = useMemo(
    () => ({
      backgroundImage: `url(${cover})`
    }),
    [cover]
  );

  if (comicID) {
    const to = generatePath(PATHS.COMIC, {
      comicID
    });

    return (
      <div className={classes('grid', className)}>
        <Link to={to} className="grid-content">
          <div className="cover" style={style} />
          <div className="caption">
            <div className="name">{name}</div>
            <div className="latest">{latest}</div>
          </div>
        </Link>
        {children}
      </div>
    );
  }

  if (isPlaceholder) {
    return <Placeholder />;
  }

  return null;
}
