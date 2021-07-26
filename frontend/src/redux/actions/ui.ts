import { Action } from 'types';

export const Types = {
  OPEN_MENU_SLIDER: 'ui/open-menu-slider',
  CREATE_PARAMS: 'ui/create-params',
  GET_PARAMS: 'ui/get-params',
  SET_SHOWN_COMMENT: 'ui/set-shown-comment',
  SET_NEW_COMMENT: 'ui/set-new-comment',
  SET_PREV_PATH: 'ui/set-prev-path',
  SET_LOADING: 'ui/set-loading',
  SET_TEMP_AVATAR: 'ui/set-temp-avatar',
  SET_TEMP_SAVED_ARTICLE: 'ui/set-temp-saved-article'
};

export const toggleMenuSldier = (): Action => {
  return {
    type: Types.OPEN_MENU_SLIDER,
  };
};

export const createParams = (params: any): Action => {
  const jsonParams = localStorage.getItem('params');
  const prevParams = jsonParams ? JSON.parse(jsonParams) : {};

  for (const item in params) {
    prevParams[item] = params[item];
  }

  localStorage.setItem('params', JSON.stringify(prevParams));

  return {
    type: Types.CREATE_PARAMS,
    payload: {
      params: prevParams,
    },
  };
};

export const getParams = (): Action => {
  const jsonParams = localStorage.getItem('params');
  const params = jsonParams ? JSON.parse(jsonParams) : {};

  return {
    type: Types.GET_PARAMS,
    payload: {
      params,
    },
  };
};

export const reducerSetShownComment = (value: boolean, commentId: string): Action => ({
  type: Types.SET_SHOWN_COMMENT,
  payload: {
    value,
    commentId,
  },
});

export const reducerSetNewComment = (id: string): Action => ({
  type: Types.SET_NEW_COMMENT,
  payload: {
    id,
  },
});

export const setPrevPath = ({ path }: any): Action => ({
  type: Types.SET_PREV_PATH,
  payload: {
    path,
  },
});

export const setLoading = (isLoading: boolean): Action => ({
  type: Types.SET_LOADING,
  payload: {
    isLoading,
  },
});

export const setTempAvatar = (avatar:any):Action => ({
  type: Types.SET_TEMP_AVATAR,
  payload: {
    avatar
  }
})

export const setTempSavedArticle = ({ todo, article, articles }:any):Action => ({
  type: Types.SET_TEMP_SAVED_ARTICLE,
  payload: {
    todo,
    article,
    articles
  }
})
