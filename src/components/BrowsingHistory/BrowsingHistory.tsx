import React from 'react';
import { connect } from 'react-redux';
import { GridContainer } from '../GridContainer';
import { BrowsingHistoryGrid } from './BrowsingHistoryGrid';
import { RootState } from '../../store';
import { classes } from '../../utils';

const mapStateToProps = (state: RootState) => ({
  browsingHistories: state.browsingHistory.ids,
  seletable: state.browsingHistory.selectable
});

function BrowsingHistoryComponent({
  browsingHistories,
  seletable
}: ReturnType<typeof mapStateToProps>) {
  return (
    <div className={classes('browsing-history', seletable && 'selectable')}>
      <GridContainer
        items={browsingHistories}
        onGridRender={comicID => <BrowsingHistoryGrid comicID={comicID} />}
      />
    </div>
  );
}

export const BrowsingHistory = connect(mapStateToProps)(
  BrowsingHistoryComponent
);
