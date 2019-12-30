import { paginationSelector } from '@pong420/redux-crud';
import { RootState } from '../reducers';

export const searchResultsPaginationSelector = (state: RootState) => {
  return {
    ...paginationSelector(state.searchResults),
    ids: state.searchResults.ids
  };
};

export const searchResultSelector = (comicID: string | null) => (
  state: RootState
) => comicID && state.searchResults.byIds[comicID];
