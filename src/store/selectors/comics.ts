import { paginationSelector } from '@pong420/redux-crud';
import { RootState } from '../reducers';

export const comicPaginationSelector = (state: RootState) => {
  return {
    ...paginationSelector(state.comics),
    ids: state.comics.ids,
    filter: state.comics.filter
  };
};

export const comicSelector = (comicID: string | null) => (state: RootState) =>
  comicID && state.comics.byIds[comicID];

export const comicsFilterSelector = (state: RootState) => state.comics.filter;
