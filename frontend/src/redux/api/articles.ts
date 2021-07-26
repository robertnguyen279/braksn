import database from 'services/firebase';
import Axios from 'axios';
import axios from 'services/axios';


const categoryId = (category:string|undefined) => {
  switch (category) {
    case 'entertainment': return '607e947bf3dd19388417299a';
    case 'business': return'607e94b0c4a38c38846988ec';
    case 'health':return '607e94bc8aafce3884b279ae';
    case 'sports':return '608fa0900819f662099759a2';
    case 'science':return '608fa0a20819f662099759a4';
    case 'technology': return '608fa0aa0819f662099759a5';
    default: return undefined;
  }
}

export const getArticles = ({ text, limit = 999, category, sortBy = 'publishedAt', skip }: any): Promise<any> => {
  const id = categoryId(category)

  return axios.get('/articles?order=desc', {
    params: {
      text,
      limit,
      skip,
      category: id,
      sortBy,
    },
  });
};

export const getDetailArticle = ({ articleId }: any): Promise<any> => axios.get(`/article/${articleId}`);

export const getContentArticle = ({ url }: any) => {
  return Axios.get('https://aylien-text.p.rapidapi.com/extract', {
    headers: {
      'x-rapidapi-key': 'f40f5159c9msh52614451bf97026p1a3ff2jsnabfe5f427eeb',
      'x-rapidapi-host': 'aylien-text.p.rapidapi.com',
      useQueryString: 'true',
    },
    params: { url },
  });
};


export const getNumArticles = ({ category }: any): Promise<any> => {
  const id = categoryId(category)

  return axios.get('/total/articles', {
    params: {
      category: id,
    },
  });
};

export const getNumArticleByText = ({ text, category }: any): Promise<any> => {
  const id = categoryId(category)

  return axios
    .get('/articles', {
      params: {
        text,
        category:id,
        limit: '99999',
      },
    })
    .then((res) => res.data.size);
};

export const createComment = ({ articleId, comment }: any): Promise<any> => {
  return database.ref(`articles/${articleId}/comments`).child(comment.id).set(comment);
};

export const getComments = async({ articleId }: any)=> {
  return database
    .ref(`articles/${articleId}/comments`)
    .once('value')
    .then((res) => {
      const list: any[] = [];

      for (const item in res.val()) {
        list.push(res.val()[item]);
      }

      return list;
    });
};
