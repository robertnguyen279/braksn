import { takeEvery, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'redux/actions/users';
import * as api from 'redux/api/users';
import { Action } from 'types';
import { v4 as uuid } from 'uuid';

//-------------------------GET USER------------------------------
function* getUser() {
  try {
    //@ts-ignore
    const result = yield call(api.getUser);
    yield put(actions.getUserSuccess({ ...result.data }));
  } catch (e) {
    yield put(actions.getUserError());
  }
}

function* watchGetUsers() {
  yield takeEvery(actions.Types.GET_USER, getUser);
}

//-------------------------LOGIN USER-----------------------------------------------
function* loginUser(action: Action) {
  try {
    const { email, password, remember } = action.payload;
    //@ts-ignore
    const result = yield call(api.loginUser, { email, password });
    if (action.callback) action.callback();
    if (remember) {
      localStorage.setItem('beehive-auth', result.data.token);
    }
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (e) {
    if (e.response.data.message.includes('Incorrect password')) {
      if (action.callback) action.callback(e.response.data.message);
      yield put(actions.loginUserError('Incorrect password - ' + uuid()));
    }
  }
}

function* watchLoginUser() {
  yield takeLatest(actions.Types.LOGIN_USER, loginUser);
}

//--------------------------LOGIN BY GOOGLE-------------------------------------
function* loginByGoogle(action: Action) {
  try {
    //@ts-ignore
    const result = yield call(api.loginByGoogle, action.payload);
    if (action.callback) action.callback();
    localStorage.setItem('beehive-auth', result.data.token);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (e) {
    if (e.response.data.code === 11000) {
      if (action.callback) action.callback(e.response.data.code);
      yield put(actions.loginUserError('User existed - ' + uuid()));
    }
  }
}

function* watchLoginByGoogle() {
  yield takeLatest(actions.Types.LOGIN_BY_GOOGLE, loginByGoogle);
}

//---------------------------LOGIN BY FACEBOOK------------------------------------------------
function* loginByFacebook(action: Action) {
  try {
    //@ts-ignore
    const result = yield call(api.loginByFacebook, action.payload);
    if (action.callback) action.callback();
    localStorage.setItem('beehive-auth', result.data.token);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (e) {
    if (e.response.data.code === 11000) {
      if (action.callback) action.callback(e.response.data.code);
      yield put(actions.loginUserError('User existed - ' + uuid()));
    }
  }
}

function* watchLoginByFacebook() {
  yield takeLatest(actions.Types.LOGIN_BY_FACEBOOK, loginByFacebook);
}

//-------------------------CREATE USER--------------------------------------------------
function* createUser(action: Action) {
  try {
    //@ts-ignore
    const result = yield call(api.createUser, action.payload);
    localStorage.setItem('beehive-auth', result.data.token);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (e) {
    if (e.response.data.message.includes('E11000')) {
      yield put(actions.loginUserError('User existed'));
    }
  }
}

function* watchCreateUser() {
  yield takeLatest(actions.Types.CREATE_USER, createUser);
}

//----------------------------UPDATE PASSWORD-----------------------------------------
function* updatePassword(action: Action) {
  try {
    const { oldPassword, newPassword } = action.payload;
    yield call(api.updatePassword, { oldPassword, newPassword });
    if (action.callback) action.callback();
  } catch (e) {
    if (action.callback) action.callback(e.response.data);
    yield put(actions.updatePasswordError(e.response.data));
  }
}

function* watchUpdatePassword() {
  yield takeLatest(actions.Types.UPDATE_PASSWORD, updatePassword);
}

//----------------------------UPDATE AVATAR--------------------------------------------
function* updateAvatar(action: Action) {
  try {
    const { newAvatarUrl } = action.payload;
    yield call(api.updateAvatar, { newAvatarUrl });
    if (action.callback) action.callback();
  } catch (e) {
    if (action.callback) action.callback(e.response.data);
    yield put(actions.updateAvatarError(e.response.data));
  }
}

function* watchUpdateAvatar() {
  yield takeLatest(actions.Types.UPDATE_AVATAR, updateAvatar);
}

//----------------------------UPDATE SAVED ARTICLE-------------------------------------
function* updateSavedArticle(action: Action) {
  try {
    const { todo, articleId } = action.payload;
    yield call(api.updateSavedArticle, { todo, articleId });
  } catch (e) {
    yield put(actions.updateSavedArticleError(e.response.data));
  }
}

function* watchUpdateSavedArticle() {
  yield takeLatest(actions.Types.UPDATE_SAVED_ARTICLE, updateSavedArticle);
}

//----------------------------GET SAVED ARTICLES---------------------------------------
function* getSavedArticles(action: Action) {
  try {
    const { skip, limit } = action.payload;
    //@ts-ignore
    const result = yield call(api.getSavedArticles, { skip, limit });
    yield put(actions.getSavedArticlesSuccess({ articles: result.data }));
  } catch (e) {
    yield put(actions.getSavedArticlesError(e.response.data));
  }
}

function* watchGetSavedArticles() {
  yield takeEvery(actions.Types.GET_SAVED_ARTICLES, getSavedArticles);
}

const userSagas = [
  fork(watchGetUsers),
  fork(watchLoginUser),
  fork(watchLoginByGoogle),
  fork(watchLoginByFacebook),
  fork(watchCreateUser),
  fork(watchUpdatePassword),
  fork(watchUpdateAvatar),
  fork(watchUpdateSavedArticle),
  fork(watchGetSavedArticles),
];

export default userSagas;
