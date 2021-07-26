import { Types } from 'redux/actions/ui';
import { Action } from 'types';

const INITIAL_STATE = {};

export default function search(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.CREATE_PARAMS: {
      return {
        ...state,
        params: action.payload.params,
      };
    }
    case Types.GET_PARAMS: {
      return {
        ...state,
        params: action.payload.params,
      };
    }
    case Types.SET_SHOWN_COMMENT: {
      return {
        ...state,
        shownComment: action.payload,
      };
    }
    case Types.SET_NEW_COMMENT: {
      return {
        ...state,
        newComment: action.payload,
      };
    }
    case Types.SET_PREV_PATH: {
      return {
        ...state,
        prevPath: action.payload.path,
      };
    }
    case Types.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    case Types.SET_TEMP_AVATAR: {
      return {
        ...state,
        avatar: action.payload.avatar
      }
    }
    case Types.SET_TEMP_SAVED_ARTICLE: {
      const { todo, article, articles } = action.payload
      const list:any = articles
      console.log(state)
      let savedArticles:any
      if (todo == 'save') {
        savedArticles = [...list, article]
      } else {
        savedArticles = list.filter((item:any) => item._id != article._id)
      }

      return {
        ...state,
        savedArticles
      }
    }
    default:
      return state;
  }
}
