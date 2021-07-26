import { takeEvery, call, fork, put, takeLatest, all } from 'redux-saga/effects';
import * as actions from 'redux/actions/articles';
import { Action } from 'types';
import * as api from 'redux/api/articles';
import { tempComments, setTempComments } from 'pages/ArticleDetail/CommentList';
import { setLoading } from 'redux/actions/ui';
import { store } from 'App';

function* getArticles(action: Action) {
  try {
    const { text, limit, skip, category, sortBy, isHomepage = false } = action.payload;

    if (isHomepage) {
      store.dispatch(setLoading(true));
      const [result, entertainment, business, health, sports, science, technology]: any[] = yield all([
        //@ts-ignore
        call(api.getArticles, { limit: '5' }),
        call(api.getArticles, { limit: '3', category: 'entertainment' }),
        call(api.getArticles, { limit: '3', category: 'business' }),
        call(api.getArticles, { limit: '3', category: 'health' }),
        call(api.getArticles, { limit: '3', category: 'sports' }),
        call(api.getArticles, { limit: '3', category: 'science' }),
        call(api.getArticles, { limit: '3', category: 'technology' }),
      ]);
      store.dispatch(setLoading(false));

      yield put(
        actions.getArticlesSuccess({
          articles: result.data.articles,
          entertainment: entertainment.data.articles,
          business: business.data.articles,
          health: health.data.articles,
          sports: sports.data.articles,
          science: science.data.articles,
          technology: technology.data.articles,
        }),
      );
    } else {
      store.dispatch(setLoading(true));
      //@ts-ignore
      const result = yield call(api.getArticles, { text, limit, skip, category, sortBy });
      store.dispatch(setLoading(false));
      yield put(
        actions.getArticlesSuccess({
          articles: result.data.articles,
        }),
      );
    }
  } catch (e) {
    yield put(actions.getArticlesError(e));
  }
}

function* watchGetArticles() {
  yield takeEvery(actions.Types.GET_ARTICLES, getArticles);
}

//---------------------------------------------------------------
function* getDetailArticle(action: Action) {
  try {
    store.dispatch(setLoading(true));
    const { articleId } = action.payload;
    //@ts-ignore
    const result = yield call(api.getDetailArticle, { articleId });
    yield put(actions.getDetailArticleSuccess({ article: result.data.article }));
  } catch (e) {
    yield put(actions.getDetailArticleError(e));
  }
}

function* watchGetDetailArticle() {
  yield takeEvery(actions.Types.GET_DETAIL_ARTICLE, getDetailArticle);
}

//---------------------------------------------------------------
function* getComments(action: Action) {
  try {
    const { articleId } = action.payload;
    //@ts-ignore
    const result = yield call(api.getComments, { articleId });
    yield put(actions.getCommentsSuccess({ comments: result }));
  } catch (e) {
    yield put(actions.getCommentError(e));
  }
}

function* watchGetComments() {
  yield takeEvery(actions.Types.GET_COMMENTS, getComments);
}

//------------------------------------------------------------------
function* createComment(action: Action) {
  try {
    const { articleId, comment } = action.payload;
    setTempComments([...tempComments, comment]);
    yield call(api.createComment, { articleId, comment });
  } catch (e) {
    yield put(actions.createCommentError(e));
  }
}

function* watchCreateComment() {
  yield takeLatest(actions.Types.CREATE_COMMENT, createComment);
}

const articleSaga = [
  fork(watchGetArticles),
  fork(watchCreateComment),
  fork(watchGetComments),
  fork(watchGetDetailArticle),
];

export default articleSaga;
