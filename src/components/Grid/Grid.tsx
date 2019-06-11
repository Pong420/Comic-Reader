import React, { useMemo, ReactNode, HTMLAttributes } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Schema$GridData } from '../../typings';
import { classes } from '../../utils/classes';
import { PATHS } from '../../constants';
import ContentLoader from 'react-content-loader';

export interface GridPorps
  extends Partial<Schema$GridData>,
    HTMLAttributes<HTMLDivElement> {
  comicID: string;
  className?: string;
  children?: ReactNode;
  subtitle?: 'latest' | 'author';
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
  children,
  className = '',
  subtitle = 'latest',
  isPlaceholder,
  updateTime,
  ...props
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
      <div className={classes('grid', className)} {...props}>
        <div className="grid-content">
          <Link to={to}>
            <div className="cover" style={style} />
            <div className="caption">
              <div className="title">{name}</div>
              <div className="subtitle">{props[subtitle]}</div>
            </div>
          </Link>
          {children}
        </div>
      </div>
    );
  }

  if (isPlaceholder) {
    return <Placeholder />;
  }

  return null;
}
