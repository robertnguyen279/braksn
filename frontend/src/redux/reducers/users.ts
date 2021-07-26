import { Types } from 'redux/actions/users';

const INITIAL_STATE:any = {};

interface Action {
  type: string;
  payload?: any;
}

export default function users(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loginUserError: undefined,
        getUserError: undefined,
      };
    }
    case Types.GET_USER_ERROR: {
      return {
        ...state,
        getUserError: true,
      };
    }
    case Types.LOGIN_USER_ERROR: {
      return {
        ...state,
        loginUserError: action.payload.error,
      };
    }
    case Types.LOGOUT_USER: {
      return {
        ...state,
        user: undefined,
      };
    }
    case Types.UPDATE_PASSWORD_ERROR: {
      return {
        ...state,
        updatePasswordError: action.payload.error
      }
    }
    case Types.UPDATE_AVATAR_ERROR: {
      return {
        ...state,
        updateAvatarError: action.payload.error
      }
    }
    case Types.UPDATE_SAVED_ARTICLE_ERROR: {
      return {
        ...state,
        updateSavedArticleError: action.payload.error
      }
    }
    case Types.GET_SAVED_ARTICLES_SUCCESS: {
      return {
        ...state,
        savedArticles: action.payload.articles,
        getSavedArticlesError: undefined
      }
    }
    case Types.GET_SAVED_ARTICLES_ERROR: {
      return {
        ...state,
        getSavedArticlesError: action.payload.error
      }
    }
    default: {
      return state;
    }
  }
}
