export enum ContentKeys {
  SET_TOTAL_PAGE = 'SET_TOTAL_PAGE'
}

interface SetTotalPageAction {
  type: ContentKeys.SET_TOTAL_PAGE;
  payload: {
    totalPage: number;
  };
}

export type ContentTypes = SetTotalPageAction;

export type ContentActions = {
  setTotoalPage: typeof setTotoalPage;
};

export function setTotoalPage(totalPage: number) {
  return {
    type: ContentKeys.SET_TOTAL_PAGE,
    payload: {
      totalPage
    }
  };
}

export default {
  setTotoalPage
};
