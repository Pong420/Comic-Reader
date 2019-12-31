import React from 'react';
import { useSelector } from 'react-redux';
import { SelectableGrid, GridPorps } from '../../components/Grid';
import {
  browsingHistorySelector,
  browsingHistorySelectedSelector,
  useBrowsingHistorySelection
} from '../../store';
import { PATHS } from '../../constants';

interface Props extends Omit<GridPorps, 'onSelect'> {}

export function BrowsingHistoryGrid({ comicID, ...props }: Props) {
  const { chapterID, ...data } =
    useSelector(browsingHistorySelector(comicID)) || {};

  const { toggleSelection } = useBrowsingHistorySelection();

  const { selected, selectable } = useSelector(
    browsingHistorySelectedSelector(comicID!)
  );

  return (
    <SelectableGrid
      className="browsing-history-grid"
      comicID={comicID}
      selected={selected}
      selectable={selectable}
      onSelect={toggleSelection}
      prevPath={PATHS.BROWSING_HISTORY}
      subtitleType="author"
      {...props}
      {...data}
    />
  );
}
