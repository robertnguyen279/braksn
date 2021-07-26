import { Action } from 'types';

export const Types = {
  GET_ARTICLES: 'article/get-articles',
  GET_ARTICLES_SUCCESS: 'article/get-articles-success',
  GET_ARTICLES_ERROR: 'article/get-articles-error',
  CREATE_COMMENT: 'articles/create-comment',
  CREATE_COMMENT_ERROR: 'articles/create-comment-error',
  GET_COMMENTS: 'articles/get-comment',
  GET_COMMENTS_SUCCESS: 'articles/get-comment-success',
  GET_COMMENTS_ERROR: 'articles/get-comment-error',
  GET_DETAIL_ARTICLE: 'article/get-detail-article',
  GET_DETAIL_ARTICLE_SUCCESS: 'article/get-detail-article-success',
  GET_DETAIL_ARTICLE_ERROR: 'article/get-detail-article-error',
};

export const getArticles = ({ text, limit, skip, orderBy, category, isHomepage }: any): Action => ({
  type: Types.GET_ARTICLES,
  payload: {
    text,
    limit,
    skip,
    orderBy,
    category,
    isHomepage,
  },
});

export const getArticlesSuccess = ({
  articles,
  entertainment,
  business,
  health,
  sports,
  science,
  technology,
}: any): Action => ({
  type: Types.GET_ARTICLES_SUCCESS,
  payload: {
    articles,
    entertainment,
    business,
    health,
    sports,
    science,
    technology,
  },
});

export const getArticlesError = (error: any): Action => ({
  type: Types.GET_ARTICLES_ERROR,
  payload: {
    error,
  },
});

export const getDetailArticle = ({ articleId }: any): Action => ({
  type: Types.GET_DETAIL_ARTICLE,
  payload: {
    articleId,
  },
});

export const getDetailArticleSuccess = ({ article }: any): Action => ({
  type: Types.GET_DETAIL_ARTICLE_SUCCESS,
  payload: {
    article,
  },
});

export const getDetailArticleError = (error: any): Action => ({
  type: Types.GET_DETAIL_ARTICLE_ERROR,
  payload: {
    error,
  },
});

export const createComment = ({ articleId, comment }: any): Action => ({
  type: Types.CREATE_COMMENT,
  payload: {
    articleId,
    comment,
  },
});

export const createCommentError = (error: any) => ({
  type: Types.CREATE_COMMENT_ERROR,
  payload: {
    error,
  },
});

export const getComments = ({ articleId }: any): Action => ({
  type: Types.GET_COMMENTS,
  payload: {
    articleId,
  },
});

export const getCommentsSuccess = ({ comments }: any): Action => ({
  type: Types.GET_COMMENTS_SUCCESS,
  payload: {
    comments,
  },
});

export const getCommentError = (error: any): Action => ({
  type: Types.GET_COMMENTS_ERROR,
  payload: {
    error,
  },
});
