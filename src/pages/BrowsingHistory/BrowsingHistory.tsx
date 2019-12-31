import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { BrowsingHistoryGrid } from './BrowsingHistoryGrid';
import { GridContainer } from '../../components/GridContainer';
import { browsingHistoryIdsSelector } from '../../store';

export function BrowsingHistory({ location }: RouteComponentProps) {
  const browsingHistory = useSelector(browsingHistoryIdsSelector);

  return (
    <div className="browsing-history">
      <GridContainer
        items={browsingHistory}
        overscanRowCount={2}
        scrollPostionKey={location.pathname}
        onGridRender={id => <BrowsingHistoryGrid comicID={id} />}
      />
    </div>
  );
}
