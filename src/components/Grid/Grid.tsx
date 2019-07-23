import React, { useMemo, HTMLAttributes, CSSProperties } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { connect, DispatchProp, Omit } from 'react-redux';
import { classes } from '../../utils/classes';
import { PATHS } from '../../constants';
import { RootState } from '../../store';
import { Schema$GridData } from '../../typings';

export interface GridPorps extends HTMLAttributes<HTMLDivElement> {
  comicID: string;
  subtitleType?: 'latest' | 'author';
}

const mapStateToProps = (state: RootState, ownProps: GridPorps) => ({
  ...((state.comics.byIds[ownProps.comicID] || {}) as Omit<
    Partial<Schema$GridData>,
    'comicID'
  >)
});

export function GridComponent({
  comicID,
  children,
  className = '',
  cover,
  name,
  subtitleType = 'latest',
  updateTime,
  dispatch,
  ...props
}: GridPorps & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const style = useMemo<CSSProperties>(
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
              <div className="subtitle">{props[subtitleType]}</div>
            </div>
          </Link>
          {children}
        </div>
      </div>
    );
  }

  return null;
}

export const Grid = connect(mapStateToProps)(GridComponent);
