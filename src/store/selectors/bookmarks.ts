import { RootState } from '../reducers';

export const bookmarkIdsSelector = (state: RootState) => state.bookmarks.ids;

export const bookmarkSelector = (comicID: string | null) => (
  state: RootState
) => comicID && state.bookmarks.byIds[comicID];

export const bookmarkedSelector = (comicID: string) => (state: RootState) =>
  state.bookmarks.ids.includes(comicID);
