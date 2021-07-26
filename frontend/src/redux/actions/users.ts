import { Action, CreateUser, LoginUser, LoginByGoogle, LoginByFacebook } from 'types';

export const Types = {
  GET_USER_SUCCESS: 'user/get-user-success',
  GET_USER: 'user/get-user',
  GET_USER_ERROR: 'user/get-user-error',
  CREATE_USER: 'user/create-user',
  LOGIN_USER: 'user/login-user',
  LOGIN_USER_ERROR: 'user/login-user-error',
  LOGIN_BY_GOOGLE: 'user/login-by-google',
  LOGIN_BY_FACEBOOK: 'user/login-by-facebook',
  LOGOUT_USER: 'user/logout-user',
  UPDATE_PASSWORD: 'user/update-password',
  UPDATE_PASSWORD_ERROR: 'user/update-password-error',
  UPDATE_AVATAR: 'user/update-avatar',
  UPDATE_AVATAR_ERROR: 'user/update-avatar-error',
  UPDATE_SAVED_ARTICLE: 'user/update-saved-article',
  UPDATE_SAVED_ARTICLE_ERROR: 'user/update-saved-article-error',
  GET_SAVED_ARTICLES: 'user/get-saved-articles',
  GET_SAVED_ARTICLES_SUCCESS: 'user/get-saved-articles-success',
  GET_SAVED_ARTICLES_ERROR: 'user/get-saved-articles-error',
};

//--------------------------------GET USER--------------------------------
export const getUser = (): Action => ({
  type: Types.GET_USER,
});

export const getUserSuccess = (user: any): Action => ({
  type: Types.GET_USER_SUCCESS,
  payload: {
    ...user,
  },
});

export const getUserError = (): Action => ({
  type: Types.GET_USER_ERROR,
});

//---------------------------------LOGIN USER------------------------------------
export const loginUser = ({ email, password, remember }: LoginUser, callback?: any): Action => ({
  type: Types.LOGIN_USER,
  payload: {
    email,
    password,
    remember,
  },
  callback: (e?: any) => callback(e),
});

export const loginUserError = (error: string | undefined): Action => ({
  type: Types.LOGIN_USER_ERROR,
  payload: {
    error,
  },
});

//----------------------------------LOGIN BY GOOGLE, FACEBOOK---------------------------------------------------------
export const loginByGoogle = (
  { firstName = '', lastName = '', avatar, email, token }: LoginByGoogle,
  callback?: any,
): Action => ({
  type: Types.LOGIN_BY_GOOGLE,
  payload: {
    firstName,
    lastName,
    avatar,
    email,
    token,
  },
  callback: (e?: any) => callback(e),
});

export const loginByFacebook = ({ name, email, avatar }: LoginByFacebook, callback?: any): Action => ({
  type: Types.LOGIN_BY_FACEBOOK,
  payload: {
    name,
    email,
    avatar,
  },
  callback: (e?: any) => callback(e),
});

//--------------------------------CREATE USER----------------------------------------
export const createUser = ({ password, email }: CreateUser) => ({
  type: Types.CREATE_USER,
  payload: {
    email,
    password,
  },
});

//--------------------------------LOGOUT USER----------------------------------------
export const logoutUser = (): Action => ({
  type: Types.LOGOUT_USER,
});

//-------------------------------UPDATE PASSWORD---------------------------------------------
export const updatePassword = ({ oldPassword, newPassword }: any, callback?: any): Action => ({
  type: Types.UPDATE_PASSWORD,
  payload: {
    oldPassword,
    newPassword,
  },
  callback: (e?: any) => callback(e),
});

export const updatePasswordError = (error: any): Action => ({
  type: Types.UPDATE_PASSWORD_ERROR,
  payload: {
    error,
  },
});

//-------------------------------UPDATE AVATAR----------------------------------------------
export const updateAvatar = ({ newAvatarUrl }: any, callback?: any): Action => ({
  type: Types.UPDATE_AVATAR,
  payload: {
    newAvatarUrl,
  },
  callback: (e: any) => callback(e),
});

export const updateAvatarError = (error: any): Action => ({
  type: Types.UPDATE_AVATAR_ERROR,
  payload: {
    error,
  },
});

//--------------------------------UPDATE SAVED ARTICLE------------------------------------------------
export const updateSavedArticle = ({ todo, articleId }: any, callback?: any): Action => ({
  type: Types.UPDATE_SAVED_ARTICLE,
  payload: {
    todo,
    articleId,
  },
  callback: (e: any) => callback(e),
});

export const updateSavedArticleError = (error: any): Action => ({
  type: Types.UPDATE_SAVED_ARTICLE_ERROR,
  payload: {
    error,
  },
});

//--------------------------------GET SAVED ARTICLES----------------------------------------------
export const getSavedArticles = ({ skip, limit }: any): Action => ({
  type: Types.GET_SAVED_ARTICLES,
  payload: {
    skip,
    limit,
  },
});

export const getSavedArticlesSuccess = ({ articles }: any): Action => ({
  type: Types.GET_SAVED_ARTICLES_SUCCESS,
  payload: {
    articles,
  },
});

export const getSavedArticlesError = (error: any): Action => ({
  type: Types.GET_SAVED_ARTICLES_ERROR,
  payload: {
    error,
  },
});
