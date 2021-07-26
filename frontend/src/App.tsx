import React from 'react';
import { Provider } from 'react-redux';
import reducers from 'redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'redux/sagas';
import { BrowserRouter } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

import router from 'router';

const App = (): React.ReactElement => (
  <Provider store={store}>
    <BrowserRouter>{router}</BrowserRouter>
  </Provider>
);

export default App;
