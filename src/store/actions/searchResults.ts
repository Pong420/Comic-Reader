import { createCRUDActions } from '@pong420/redux-crud';
import { Schema$SearchResult } from '../../typings';
import { useActions } from '../../hooks/useActions';

export const [searchResultActions, SearchResultActionTypes] = createCRUDActions<
  Schema$SearchResult,
  'comicID'
>()({
  paginateSearchResults: ['PAGINATE', 'PAGINATE_SAERCH_RESULTS']
});

export const useSearchResultActions = () => useActions(searchResultActions);
