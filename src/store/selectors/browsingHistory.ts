import { RootState } from '../reducers';

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
