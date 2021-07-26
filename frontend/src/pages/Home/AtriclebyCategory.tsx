import React from 'react';
import { RootState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import NoImage from 'assets/images/no-image-available.jpg';
//@ts-ignore
import LineEllispsis from 'react-lines-ellipsis';

const AtriclebyCategory = () => {
  const history = useHistory();
  const entertainment = useSelector((state: RootState) => state.articles.entertainment);
  const business = useSelector((state: RootState) => state.articles.business);
  const health = useSelector((state: RootState) => state.articles.health);
  const sports = useSelector((state: RootState) => state.articles.sports);
  const science = useSelector((state: RootState) => state.articles.science);
  const technology = useSelector((state: RootState) => state.articles.technology);

  const articles = entertainment?.concat(business, health, sports, science, technology);

  const categories = [
    { color: 'pink-5000', name: 'Entertainment' },
    { color: 'blue-5000', name: 'Business' },
    { color: 'yellow-5000', name: 'Health' },
    { color: 'green-5000', name: 'Science' },
    { color: 'red-5000', name: 'Sports' },
    { color: 'purple-5000', name: 'Technology' },
  ];

  const saveId = (id: string) => {
    localStorage.setItem('articleId', id);
  };

  const articleRender = (articles: any[], category: any) => (
    <div>
      {articles?.length > 0 &&
        articles
          .filter((article: any) => article?.category.name == category.name)
          .map((article: any, i: number) => {
            const author: string = article.author ? article.author : article.source;
            const publishedAt = moment(article.publishedAt).format('DD MMM YYYY');

            if (i == 0) {
              return (
                <div className="relative flex flex-col" key={i}>
                  <button
                    onClick={() => {
                      history.push(`/${article.category.name.toLowerCase()}`);
                    }}
                    className={`absolute rounded bg-${category.color} text-sm p-2 font-semibold top-2 left-2 text-white focus:outline-none`}
                  >
                    {category.name}
                  </button>
                  <Link
                    className="flex flex-col"
                    onClick={() => saveId(article._id)}
                    to={`/newsList/${encodeURI(article.title)}`}
                  >
                    <div className="w-full h-64 rounded-md shadow-xl overflow-hidden">
                      <img
                        onError={(e) => {
                          e.currentTarget.onerror == null;
                          e.currentTarget.src = NoImage;
                        }}
                        src={article.urlToImage ? article.urlToImage : NoImage}
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="flex m-0 mb-1 text-gray-400 truncate">
                        <span className={`'truncate`}>{author}</span>&nbsp;-{' '}
                        {publishedAt}
                      </p>
                      <h1 className="text-lg hover:text-blue-500 transform duration-300">{article.title}</h1>
                    </div>
                  </Link>
                </div>
              );
            } else if (i < 3) {
              return (
                <div className="flex my-4 relative" key={i}>
                  <button
                    onClick={() => {
                      history.push(`/${article.category.name.toLowerCase()}`);
                    }}
                    className={`absolute rounded bg-${category.color} text-xs p-1 font-semibold top-1 left-1 text-white focus:outline-none`}
                  >
                    {category.name}
                  </button>
                  <Link
                    className="flex"
                    onClick={() => saveId(article._id)}
                    to={`/newsList/${encodeURI(article.title)}`}
                  >
                    <div className="flex-none w-28 h-20 rounded-md shadow-xl mr-4 overflow-hidden">
                      <img
                        onError={(e) => {
                          e.currentTarget.onerror == null;
                          e.currentTarget.src = NoImage;
                        }}
                        src={article.urlToImage ? article.urlToImage : NoImage}
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid my-auto">
                      <div className="flex mb-1 w-full text-gray-400 truncate">
                        <span className={`truncate`}>{author}</span>&nbsp;-{' '}
                        {publishedAt}
                      </div>
                      <LineEllispsis
                        text={article.title}
                        maxLine="2" 
                        ellipsis="..." 
                        trimRight 
                        basedOn="letters" 
                        className="text-black" 
                      />
                    </div>
                  </Link>
                </div>
              );
            } else {
              return null;
            }
          })}
    </div>
  );

  return (
    <div>
      {categories.map((category, i) => (
        <div key={i} className="flex flex-col my-10">
          <div className="flex justify-between border border-gray-300 rounded-md h-14 mb-10 ">
            <div className="flex">
              <div className={`bg-${category.color} h-full w-2 rounded-md`}></div>
              <div className="text-lg mx-4 my-auto">{category.name}</div>
            </div>
            <Link className="justify-self-end self-center mr-4" to={`/${category.name.toLowerCase()}`}>
              View more
            </Link>
          </div>
          {articleRender(articles, category)}
        </div>
      ))}
    </div>
  );
};

export default AtriclebyCategory;
