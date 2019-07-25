import React from 'react';
import { Grid } from '../Grid';
import { connect, DispatchProp, Omit } from 'react-redux';
import { RootState } from '../../store';
import { Schema$GridData } from '../../typings';

interface Props {
  comicID: string;
}

const mapStateToProps = (state: RootState, { comicID }: Props) => ({
  ...((state.comics.byIds[comicID] || {}) as Omit<
    Partial<Schema$GridData>,
    'comicID'
  >)
});

export function HomeGridComponent({
  dispatch,
  ...props
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  return <Grid {...props} />;
}

export const HomeGrid = connect(mapStateToProps)(HomeGridComponent);
