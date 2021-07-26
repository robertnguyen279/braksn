import userSagas from './users';
import articleSaga from './articles'
import { all } from 'redux-saga/effects';

export default function* rootSaga(): any {
  yield all([...userSagas, ...articleSaga]);
}
