import React from 'react';
import { Route, Switch } from 'react-router';
import Auth from 'components/Auth';
import Layout from 'components/Layout';

import HomePage from 'pages/Home';
import RegisterLogin from 'pages/RegisterLogin';
import NewsList from 'pages/NewsList';
import ArticleDetail from 'pages/ArticleDetail';
import Profile from 'pages/Profile';

import Notification from 'components/Notification';

export default (
  <Layout>
    <Switch>
      <Route exact path="/" component={Auth(HomePage, null)} />
      <Route exact path="/newsList" component={Auth(NewsList, null)} />
      <Route exact path="/newsList/:title" component={Auth(ArticleDetail, null)} />
      <Route exact path="/entertainment" component={Auth(NewsList, null)} />
      <Route exact path="/entertainment/:title" component={Auth(ArticleDetail, null)} />
      <Route exact path="/business" component={Auth(NewsList, null)} />
      <Route exact path="/newsList/:title" component={Auth(ArticleDetail, null)} />
      <Route exact path="/health" component={Auth(NewsList, null)} />
      <Route exact path="/business/:title" component={Auth(ArticleDetail, null)} />
      <Route exact path="/science" component={Auth(NewsList, null)} />
      <Route exact path="/science/:title" component={Auth(ArticleDetail, null)} />
      <Route exact path="/sports" component={Auth(NewsList, null)} />
      <Route exact path="/sports/:title" component={Auth(ArticleDetail, null)} />
      <Route exact path="/technology" component={Auth(NewsList, null)} />
      <Route exact path="/technology/:title" component={Auth(ArticleDetail, null)} />
      <Route exact path="/savedNews" component={Auth(NewsList, true)} />
      <Route exact path="/savedNews/:title" component={Auth(ArticleDetail, true)} />

      <Route exact path="/test" component={Auth(Notification, null)} />

      <Route exact path="/registerLogin" component={Auth(RegisterLogin, false)} />
      <Route exact path="/profile" component={Auth(Profile, true)} />
    </Switch>
  </Layout>
);
