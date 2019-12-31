import React, { HTMLAttributes, ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { PATHS } from '../../constants';
import { Schema$GridData } from '../../typings';

export interface GridPorps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<Partial<Schema$GridData>, 'comicID'> {
  comicID: string | null;
  subtitleType?: 'latest' | 'author';
  prevPath?: string;
}

export function Grid({
  className = '',
  children,
  subtitleType = 'latest',
  prevPath,
  comicID,
  cover,
  name,
  updateTime,
  ...props
}: GridPorps) {
  let content: ReactNode = null;

  const subtitle = props[subtitleType];

  if (comicID) {
    const pathname = generatePath(PATHS.COMIC_DETAILS, {
      comicID
    });

    content = (
      <div className="grid-content">
        <Link to={{ pathname, state: { prevPath } }}>
          <img className="cover" src={cover} alt="" />
          {name && subtitle && (
            <div className="caption">
              <div className="title">{name}</div>
              <div className="subtitle">{subtitle}</div>
            </div>
          )}
        </Link>
        {children}
      </div>
    );
  }

  return (
    <div className={`grid ${className}`.trim()} {...props}>
      {content}
    </div>
  );
}
