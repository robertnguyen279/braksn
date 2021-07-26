import { Types } from 'redux/actions/articles';
import { Action } from 'types';

const INITIAL_STATE = {
  articles: [],
};

export default function articles(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_ARTICLES_SUCCESS: {
      return {
        ...state,
        articles: action.payload.articles,
        entertainment: action.payload.entertainment,
        business: action.payload.business,
        health: action.payload.health,
        sports: action.payload.sports,
        science: action.payload.science,
        technology: action.payload.technology,
        getArticlesSuccess: true,
      };
    }
    case Types.GET_ARTICLES_ERROR: {
      return {
        ...state,
        getArticlesError: action.payload.error,
      };
    }
    case Types.GET_DETAIL_ARTICLE_SUCCESS: {
      return {
        ...state,
        article: action.payload.article,
      };
    }
    case Types.GET_DETAIL_ARTICLE_ERROR: {
      return {
        ...state,
        getDetailArticleError: action.payload.error,
      };
    }
    case Types.GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: action.payload.comments,
      };
    }
    case Types.CREATE_COMMENT_ERROR: {
      return {
        ...state,
        createCommentError: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
}
