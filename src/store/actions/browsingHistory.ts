import { createCRUDActions } from '@pong420/redux-crud';
import { Schema$BrowsingHistory } from '../../typings';
import { useActions } from '../../hooks/useActions';

export const [
  browsingHistoryActions,
  BrowsingHistoryActionTypes
] = createCRUDActions<Schema$BrowsingHistory, 'comicID'>()({
  createBrowsingHistory: ['CREATE', 'CREATE_BROWSING_HISTORY'],
  deleteBrowsingHistory: ['CREATE', 'DELTE_BROWSING_HISTORY']
});

export const useBrowsingHistoryActions = () =>
  useActions(browsingHistoryActions);
