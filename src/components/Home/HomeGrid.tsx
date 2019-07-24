import React from 'react';
import { Grid, GridPorps } from '../Grid';
import { connect, DispatchProp, Omit } from 'react-redux';
import { RootState } from '../../store';
import { Schema$GridData } from '../../typings';

const mapStateToProps = (state: RootState, { comicID }: GridPorps) => ({
  ...((state.comics.byIds[comicID] || {}) as Omit<
    Partial<Schema$GridData>,
    'comicID'
  >)
});

export function HomeGridComponent({
  dispatch,
  ...props
}: GridPorps & DispatchProp & ReturnType<typeof mapStateToProps>) {
  return <Grid {...props} />;
}

export const HomeGrid = connect(mapStateToProps)(HomeGridComponent);
