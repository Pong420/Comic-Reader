import { RootState } from '../reducers';
import { selectionSelector } from '../selection';

export const isLastVisitSelector = (comicID: string, chapterID: string) => (
  state: RootState
) => {
  const history = state.browsingHistory.byIds[comicID];
  return !!(history && history.chapterID === chapterID);
};

export const browsingHistoryIdsSelector = (state: RootState) =>
  state.browsingHistory.ids.slice().reverse();

export const browsingHistorySelector = (comicID: string | null) => (
  state: RootState
) => comicID && state.browsingHistory.byIds[comicID];

export const browsingHistorySelectionSelector = (state: RootState) => {
  const select = selectionSelector(state.browsingHistory);
  const total = state.browsingHistory.ids.length;
  return {
    ...select,
    total,
    allSelected: total === select.selection.length
  };
};
export const browsingHistorySelectedSelector = (comicID: string) => (
  state: RootState
) => {
  const { selectable, selection } = state.browsingHistory;
  return { selected: selection.includes(comicID), selectable };
};
