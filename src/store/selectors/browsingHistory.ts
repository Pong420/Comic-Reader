import { RootState } from '../reducers';

export const isLastVisitSelector = (comicID: string, chapterID: string) => (
  state: RootState
) => {
  const history = state.browsingHistory.byIds[comicID];
  return !!(history && history.chapterID === chapterID);
};
