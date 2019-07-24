import React from 'react';
import { Grid, GridPorps } from '../Grid';
import { connect, DispatchProp, Omit } from 'react-redux';
import { RootState } from '../../store';
import { Schema$BrowsingHistory } from '../../typings';

const mapStateToProps = (state: RootState, { comicID }: GridPorps) => ({
  ...((state.browsingHistory.byIds[comicID] || {}) as Omit<
    Partial<Schema$BrowsingHistory>,
    'comicID'
  >)
});

export function BrowsingHistoryGridComponent({
  dispatch,
  chapterID,
  ...props
}: GridPorps & DispatchProp & ReturnType<typeof mapStateToProps>) {
  return <Grid {...props} />;
}

export const BrowsingHistoryGrid = connect(mapStateToProps)(
  BrowsingHistoryGridComponent
);
