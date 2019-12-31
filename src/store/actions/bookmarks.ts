import { createCRUDActions } from '@pong420/redux-crud';
import { useActions } from '../../hooks/useActions';

export const [bookmarkActions, BookmarkActionTypes] = createCRUDActions<
  Schema$Bookmark,
  'comicID'
>()({
  createBookmark: ['CREATE', 'CREATE_BOOKMARK'],
  deleteBookmark: ['DELETE', 'DELETE_BOOKMARK'],
  updateBookmark: ['UPDATE', 'UPDATE_BOOKMARK']
});

export const useBookmarkActions = () => useActions(bookmarkActions);
