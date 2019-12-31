import { createCRUDActions } from '@pong420/redux-crud';
import { useActions } from '../../hooks/useActions';

export const [
  browsingHistoryActions,
  BrowsingHistoryActionTypes
] = createCRUDActions<Schema$BrowsingHistory, 'comicID'>()({
  createBrowsingHistory: ['CREATE', 'CREATE_BROWSING_HISTORY'],
  deleteBrowsingHistory: ['DELETE', 'DELETE_BROWSING_HISTORY'],
  updateBrowsingHistory: ['UPDATE', 'UPDATE_BROWSING_HISTORY']
});

export const useBrowsingHistoryActions = () =>
  useActions(browsingHistoryActions);
