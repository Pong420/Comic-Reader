import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { BrowsingHistoryGrid } from './BrowsingHistoryGrid';
import { GridContainer } from '../../components/GridContainer';
import { browsingHistoryIdsSelector } from '../../store';
import { useDraggable } from '../../hooks/useDraggable';

export function BrowsingHistory({ location }: RouteComponentProps) {
  const browsingHistory = useSelector(browsingHistoryIdsSelector);
  const dragableProps = useDraggable();

  return (
    <div className="browsing-history">
      <GridContainer
        items={browsingHistory}
        overscanRowCount={2}
        scrollPostionKey={location.pathname}
        onGridRender={id => (
          <BrowsingHistoryGrid {...dragableProps} comicID={id} />
        )}
      />
    </div>
  );
}
