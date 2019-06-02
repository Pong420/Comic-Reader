import React, { ReactNode, useMemo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Schema$GridData } from '../../typings';
import { classes } from '../../utils/classes';
import { PATHS } from '../../constants';
// import ContentLoader from 'react-content-loader';

export interface GridPorps extends Schema$GridData {
  className?: string;
  children?: ReactNode;
  isPlaceholder?: boolean;
}

function Placeholder() {
  return null;
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
        <div className="grid-content">
          <Link to={to}>
            <div className="cover" style={style} />
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
