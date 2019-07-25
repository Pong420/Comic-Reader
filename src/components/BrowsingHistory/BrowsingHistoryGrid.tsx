import React from 'react';
import { Grid } from '../Grid';
import { connect, DispatchProp } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  comicID: string;
}

const mapStateToProps = (state: RootState, { comicID }: Props) => ({
  ...state.browsingHistory.byIds[comicID]
});

export function BrowsingHistoryGridComponent({
  dispatch,
  chapterID,
  ...props
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  return <Grid {...props} />;
}

export const BrowsingHistoryGrid = connect(mapStateToProps)(
  BrowsingHistoryGridComponent
);
