import React, { HTMLAttributes, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { PATHS } from '../../constants';
import { comicSelector } from '../../store';

export interface GridPorps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  id: string | null;
  subtitleType?: 'latest' | 'author';
  prevPath?: string;
}

export function Grid({
  id,
  subtitleType = 'latest',
  prevPath,
  className = '',
  children,
  ...props
}: GridPorps) {
  const comic = useSelector(comicSelector(id));
  let content: ReactNode = null;

  if (comic) {
    const { comicID, cover, name } = comic;
    const subtitle = comic[subtitleType];

    const pathname = generatePath(PATHS.COMIC, {
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
