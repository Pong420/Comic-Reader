import { createCRUDActions, UnionCRUDActions } from '@pong420/redux-crud';
import { Schema$ComicItem } from '../../typings';
import { useActions } from '../../hooks/useActions';

const [actions, actionTypes] = createCRUDActions<Schema$ComicItem, 'comicID'>()(
  {
    paginateComics: ['PAGINATE', 'PAGINATE_COMICS'],
    setPageComics: ['SET_PAGE', 'SET_PAGE_COMICS']
  }
);

export const ComicActionTypes = {
  ...actionTypes,
  SET_FILTER: 'SET_FILTER' as const
};

function setFilter(payload: string[]) {
  return {
    type: ComicActionTypes.SET_FILTER,
    payload
  };
}

export type SetFilter = ReturnType<typeof setFilter>;

export type ComicActions = UnionCRUDActions<typeof actions> | SetFilter;

export const useComicActions = () => useActions(actions);
export const useComicFilter = () => useActions({ setFilter });
