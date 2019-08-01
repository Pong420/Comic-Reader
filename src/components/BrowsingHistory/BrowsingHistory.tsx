import React from 'react';
import { connect } from 'react-redux';
import { GridContainer } from '../GridContainer';
import { BrowsingHistoryGrid } from './BrowsingHistoryGrid';
import { RootState } from '../../store';
import { classes } from '../../utils/classes';
import { useDraggable } from '../../utils/useDraggable';

const mapStateToProps = (state: RootState) => ({
  browsingHistories: state.browsingHistory.ids,
  seletable: state.browsingHistory.selectable
});

function BrowsingHistoryComponent({
  browsingHistories,
  seletable
}: ReturnType<typeof mapStateToProps>) {
  const dragProps = useDraggable();

  return (
    <div className={classes('browsing-history', seletable && 'selectable')}>
      <GridContainer
        scrollPostionKey="browsing-history"
        items={browsingHistories}
        onGridRender={comicID => (
          <BrowsingHistoryGrid {...dragProps} comicID={comicID} />
        )}
      />
    </div>
  );
}

export const BrowsingHistory = connect(mapStateToProps)(
  BrowsingHistoryComponent
);
