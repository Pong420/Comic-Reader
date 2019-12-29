import { RootState } from '../reducers';

export const isLastVisitSelector = (comicID: string) => (state: RootState) =>
  state.browsingHistory.ids.includes(comicID);
