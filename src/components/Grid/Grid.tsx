import React, { useMemo, HTMLAttributes, CSSProperties } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Omit } from 'react-redux';
import { classes } from '../../utils/classes';
import { PATHS } from '../../constants';
import { Schema$GridData } from '../../typings';

export interface GridPorps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<Partial<Schema$GridData>, 'comicID'> {
  comicID: string;
  subtitleType?: 'latest' | 'author';
}

export function Grid({
  comicID,
  children,
  className = '',
  cover,
  name,
  subtitleType = 'latest',
  updateTime,
  ...props
}: GridPorps) {
  const style = useMemo<CSSProperties>(
    () => ({
      backgroundImage: `url(${cover})`
    }),
    [cover]
  );

  const subtitle = props[subtitleType];

  if (comicID) {
    const to = generatePath(PATHS.COMIC, {
      comicID
    });

    return (
      <div className={classes('grid', className)} {...props}>
        <div className="grid-content">
          <Link to={to}>
            <div className="cover" style={style} />
            {name && subtitle && (
              <div className="caption">
                <div className="title">{name}</div>
                <div className="subtitle">{subtitle}</div>
              </div>
            )}
          </Link>
          {children}
        </div>
      </div>
    );
  }

  return null;
}
