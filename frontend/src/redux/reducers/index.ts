import { combineReducers } from 'redux';
import users from './users';
import ui from './ui'
import articles from './articles'

const rootReducer = combineReducers({
  users,
  ui,
  articles
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
