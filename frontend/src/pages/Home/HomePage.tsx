import TrendingAtricles from './TrendingAtricles';
import React, { useEffect } from 'react';
import AtriclebyCategory from './AtriclebyCategory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { getArticles } from 'redux/actions/articles';
import LoadingScreen from 'components/LoadingScreen';

function HomePage(): React.ReactElement {
  const articles = useSelector((state: RootState) => state.articles.articles);
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles({ isHomepage: true }));
  }, [JSON.stringify(articles)]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <div className="flex flex-col bg-gray-100 rounded-md border border-gray-300 px-5 py-5 mb-5">
        <h1>TRENDING NOW:</h1>
        <p className="truncate m-0">{articles[0]?.title}</p>
      </div>
      <TrendingAtricles />
      <AtriclebyCategory />
    </div>
  );
}

export default HomePage;
