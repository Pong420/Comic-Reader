export enum SelectionTypes {
  TOGGLE_SELECTABLE = 'TOGGLE_SELECTABLE',
  TOGGLE_SELECTION = 'TOGGLE_SELECTION',
  TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL',
  SET_SELECTION = 'SET_SELECTION'
}

type Actions =
  | { sub: SelectionTypes.TOGGLE_SELECTABLE }
  | { sub: SelectionTypes.TOGGLE_SELECT_ALL; payload: string[] }
  | { sub: SelectionTypes.TOGGLE_SELECTION; payload: string }
  | { sub: SelectionTypes.SET_SELECTION; payload: string[] };

export interface SelectionState {
  selection: string[];
  selectable: boolean;
}

export const selectionInitialState: SelectionState = {
  selection: [],
  selectable: false
};

export function selectionReducer(
  state = selectionInitialState,
  action: Actions
): SelectionState {
  switch (action.sub) {
    case SelectionTypes.TOGGLE_SELECTION:
      const index = state.selection.indexOf(action.payload);
      const selection =
        index === -1
          ? [...state.selection, action.payload]
          : [
              ...state.selection.slice(0, index),
              ...state.selection.slice(index + 1)
            ];

      return {
        ...state,
        selection
      };

    case SelectionTypes.TOGGLE_SELECTABLE:
      return {
        ...state,
        selectable: !state.selectable
      };

    case SelectionTypes.TOGGLE_SELECT_ALL:
      return {
        ...state,
        selection:
          action.payload.length === state.selection.length ? [] : action.payload
      };

    case SelectionTypes.SET_SELECTION:
      return {
        ...state,
        selection: action.payload
      };

    default:
      return state;
  }
}

export function selectionSelector<S extends SelectionState>({
  selectable,
  selection
}: S) {
  return { selectable, selection };
}
