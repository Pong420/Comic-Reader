import { RootState } from '../reducers';
import { selectionSelector } from '../selection';

export const bookmarkIdsSelector = (state: RootState) => state.bookmarks.ids;

export const bookmarkSelector = (comicID: string | null) => (
  state: RootState
) => comicID && state.bookmarks.byIds[comicID];

export const bookmarkedSelector = (comicID: string) => (state: RootState) =>
  state.bookmarks.ids.includes(comicID);

export const bookmarkSelectionSelector = (state: RootState) => {
  const select = selectionSelector(state.bookmarks);
  const total = state.bookmarks.ids.length;
  return {
    ...select,
    total,
    allSelected: total === select.selection.length
  };
};

export const bookmarkSelectedSelector = (comicID: string) => (
  state: RootState
) => {
  const { selectable, selection } = state.bookmarks;
  return { selected: selection.includes(comicID), selectable };
};
