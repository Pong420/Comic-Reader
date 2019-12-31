import { createCRUDReducer } from '@pong420/redux-crud';
import { ComicActionTypes, ComicActions } from '../actions/comics';
import { Schema$ComicItem } from '../../typings';
import { SessionStorage } from '../../utils/sessionStorage';

const pageSize = 42;

const filterStorage = SessionStorage<string[]>(
  'filter-storage',
  new Array(6).fill('')
);

const [crudinitialState, crudReducer] = createCRUDReducer<
  Schema$ComicItem,
  'comicID'
>({
  key: 'comicID',
  actions: ComicActionTypes,
  pageSize,
  ids: new Array(pageSize).fill(null),
  onLocationChanged: null
});

type CRUDState = Parameters<typeof crudReducer>[0];
type State = CRUDState & {
  filter: string[];
};

const initialState: State = {
  ...crudinitialState,
  filter: filterStorage.get()
};

export function comicsReducer(
  state = initialState,
  action: ComicActions
): State {
  switch (action.type) {
    case ComicActionTypes.SET_FILTER:
      filterStorage.save(action.payload);
      return {
        ...initialState,
        filter: action.payload
      };

    default:
      return { ...state, ...crudReducer(state, action) };
  }
}
