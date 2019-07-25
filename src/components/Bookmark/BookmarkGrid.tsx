import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Grid, GridPorps } from '../Grid';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState, { comicID }: GridPorps) => ({
  ...state.bookmark.byIds[comicID]
});

export function BookmarkGridComponent({
  dispatch,
  ...props
}: GridPorps & DispatchProp & ReturnType<typeof mapStateToProps>) {
  return <Grid {...props} />;
}

export const BookmarkGrid = connect(mapStateToProps)(BookmarkGridComponent);
