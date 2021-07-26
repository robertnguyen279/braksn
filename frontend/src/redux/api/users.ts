import axios from 'services/axios';
import { LoginUser, LoginByGoogle, LoginByFacebook, CreateUser } from 'types';

export const getUser = (): Promise<any> => axios.get(`/user`);
export const loginUser = ({ email, password }: LoginUser): Promise<any> => axios.post('/login', { email, password });
export const loginByGoogle = ({ firstName, lastName, email, avatar, token }: LoginByGoogle): Promise<any> =>
  axios.post('/login-by-google', { firstName, lastName, email, avatar, authToken: token });
export const loginByFacebook = ({ name, email, avatar }: LoginByFacebook): Promise<any> =>
  axios.post('/login-by-facebook', { name, email, avatar });
export const createUser = ({ email, password }: CreateUser):Promise<any> => axios.post('/user', { password, email });
export const logoutUser = (): Promise<any> => axios.post('/user/log-out')

export const updatePassword = ({ oldPassword, newPassword }:any):Promise<any> => 
  axios.post('/user/password', { oldPassword, newPassword })
export const updateAvatar = ({ newAvatarUrl }:any): Promise<any> =>
  axios.post('/user/avatar', { newAvatarUrl })
export const updateSavedArticle = ({ todo, articleId }:any):Promise<any> =>
  axios.post(`/user/article/${articleId}`,null, { 
    params: {
      action:todo
    }
  })
export const getSavedArticles = ({ skip, limit=9999999 }:any):Promise<any> =>
  axios.get('/user/articles',{
    params: {
      skip,
      limit
    }
  })
