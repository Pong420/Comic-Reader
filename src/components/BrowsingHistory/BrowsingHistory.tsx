import React from 'react';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { BrowsingHistoryGrid } from './BrowsingHistoryGrid';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
  browsingHistories: state.browsingHistory.ids
});

export function BrowsingHistoryComponent({
  browsingHistories
}: ReturnType<typeof mapStateToProps>) {
  return (
    <div className="browsing-history">
      <AutoSizer>
        {dimen => (
          <GridContainer
            {...dimen}
            items={browsingHistories}
            onGridRender={comicID => <BrowsingHistoryGrid comicID={comicID} />}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export const BrowsingHistory = connect(mapStateToProps)(
  BrowsingHistoryComponent
);
