import { createCRUDActions } from '@pong420/redux-crud';
import { Schema$ComicItem } from '../../typings';
import { useActions } from '../../hooks/useActions';

export const [comicActions, ComicActionTypes] = createCRUDActions<
  Schema$ComicItem,
  'comicID'
>()({
  paginateComics: ['PAGINATE', 'PAGINATE_COMICS'],
  setPageComics: ['SET_PAGE', 'SET_PAGE_COMICS']
});

export const useComicActions = () => useActions(comicActions);
