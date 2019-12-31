import React from 'react';
import { batch } from 'react-redux';
import { SelectionSidebar } from '../../components/Sidebar';
import {
  useBrowsingHistorySelection,
  browsingHistorySelectionSelector,
  useBrowsingHistoryActions
} from '../../store';
import { useSelector } from 'react-redux';

export function BrowsingHistorySidebar() {
  const state = useSelector(browsingHistorySelectionSelector);
  const actions = useBrowsingHistorySelection();
  const { deleteBrowsingHistory } = useBrowsingHistoryActions();

  return (
    <SelectionSidebar
      {...actions}
      {...state}
      onDelete={ids =>
        batch(() => ids.forEach(comicID => deleteBrowsingHistory({ comicID })))
      }
      className="browsing-history-sidebar"
    />
  );
}
