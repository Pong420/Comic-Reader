import React from 'react';
import { Grid } from '../Grid';
import { connect, DispatchProp } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  comicID: string;
}

const mapStateToProps = (state: RootState, { comicID }: Props) => ({
  ...(state.comics.byIds[comicID] || {}),
  prevPath: state.router.location.pathname + state.router.location.search
});

export function HomeGridComponent({
  dispatch,
  ...props
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  return <Grid {...props} />;
}

export const HomeGrid = connect(mapStateToProps)(HomeGridComponent);
