import React from 'react';
import { RootState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import NoImage from 'assets/images/no-image-available.jpg';

const TrendingAtricles = () => {
  const articles = useSelector((state: RootState) => state.articles.articles);
  const history = useHistory();
  const saveId = (id: string) => {
    localStorage.setItem('articleId', id);
  };

  return (
    <div>
      {articles?.map((article: any, i: number) => {
        const author: string = article.author ? article.author : article.source;
        const publishedAt = moment(article.publishedAt).format('DD MMM YYYY');

        if (i < 5) {
          return (
            <div key={i} className={`relative ${i == 0 ? 'h-80' : 'h-48'} overflow-hidden mb-1`}>
              <img
                onError={(e) => {
                  e.currentTarget.onerror == null;
                  e.currentTarget.src = NoImage;
                }}
                src={article.urlToImage ? article.urlToImage : NoImage}
                alt="article"
                className="absolute object-cover h-full w-full"
              />
              <Link onClick={() => saveId(article._id)} to={`/newsList/${encodeURI(article.title)}`}>
                <div className="absolute bg-black bg-opacity-50 w-full h-full"></div>
              </Link>
              <button
                onClick={() => {
                  history.push(`/${article.category.name.toLowerCase()}`);
                }}
                className="absolute bottom-20 left-5 border py-1 px-2 rounded mb-3 focus:outline-none hover:bg-white hover:text-black text-white transform duration-500"
              >
                {article.category.name}
              </button>
              <div className="absolute bottom-0 left-5 text-white right-5">
                <Link onClick={() => saveId(article._id)} to={`/newsList/${encodeURI(article.title)}`}>
                  <h1 className="text-3xl text-white truncate hover:text-blue-500 transform duration-300">
                    {article.title}
                  </h1>
                  <p className="flex text-white truncate">
                    <span className="truncate">{author}</span>&nbsp;-{' '}
                    {publishedAt}
                  </p>
                </Link>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default TrendingAtricles;
