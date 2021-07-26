import React, { useEffect, useState } from 'react';
//@ts-ignore
import LineEllispsis from 'react-lines-ellipsis';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import NoImage from 'assets/images/no-image-available.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import NoHeartIcon from 'assets/icons/no-heart.svg';
import HeartIcon from 'assets/icons/heart.svg';
import { updateSavedArticle } from 'redux/actions/users';
import { setTempSavedArticle } from 'redux/actions/ui';

const ArticleThumbnail = ({
  _id,
  urlToImage,
  author,
  source,
  publishedAt,
  title,
  category,
  content,
  location,
  article,
}: any) => {
  const savedTempArticles = useSelector((state: RootState) => state.ui.savedArticles);
  const user = useSelector((state: RootState) => state.users.user);
  const savedArticles = useSelector((state: RootState) => state.users.savedArticles);
  const articles = savedTempArticles ? savedTempArticles : savedArticles;
  const [isSaved, setSaved] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const colorByCat = (cat: string): string => {
    switch (cat) {
      case 'Entertainment':
        return 'pink-5000';
      case 'Business':
        return 'blue-5000';
      case 'Health':
        return 'yellow-5000';
      case 'Science':
        return 'green-5000';
      case 'Sports':
        return 'red-5000';
      case 'Technology':
        return 'purple-5000';
      default:
        return 'gray-5000';
    }
  };

  useEffect(() => {
    setSaved(articles?.map((x: any) => x._id).includes(_id));
  }, []);

  const handleSaveArticle = () => {
    setSaved(!isSaved);
    dispatch(setTempSavedArticle({ todo: isSaved ? 'remove' : 'save', article, articles }));
    dispatch(updateSavedArticle({ todo: isSaved ? 'remove' : 'save', articleId: _id }));
  };

  const path = () => {
    if (['entertainment', 'business', 'health', 'science', 'sports', 'technology', 'savedNews'].includes(location)) {
      return location;
    } else {
      return 'newsList';
    }
  };

  const saveId = (id: string) => {
    localStorage.setItem('articleId', id);
  };

  const _author = author ? author : source;
  const _publishedAt = moment(publishedAt).format('DD MMM YYYY');
  const convertIdToCategory = (id: string | undefined) => {
    switch (id) {
      case '607e947bf3dd19388417299a':
        return 'Entertainment';
      case '607e94b0c4a38c38846988ec':
        return 'Business';
      case '607e94bc8aafce3884b279ae':
        return 'Health';
      case '608fa0900819f662099759a2':
        return 'Sports';
      case '608fa0a20819f662099759a4':
        return 'Science';
      case '608fa0aa0819f662099759a5':
        return 'Technology';
      default:
        return 'General';
    }
  };
  const _category = category.name ? category.name : convertIdToCategory(category);

  return (
    <div className="relative mb-16 flex flex-col">
      <Link onClick={() => saveId(_id)} to={`/${path()}/${encodeURI(title)}`}>
        <div className="w-full h-72 rounded-lg shadow-lg mb-3 overflow-hidden hover:opacity-70 duration-500">
          <img
            onError={(e) => {
              e.currentTarget.onerror == null;
              e.currentTarget.src = NoImage;
            }}
            src={urlToImage ? urlToImage : NoImage}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <button
        onClick={() => {
          history.push(`/${_category.toLowerCase()}`);
        }}
        className={`absolute rounded bg-${colorByCat(_category)} text-white-5000 p-2 font-semibold focus:outline-none
                    top-3 left-3 z-10 text-${colorByCat(_category)} hover:bg-white transform duration-500`}
      >
        {_category}
      </button>
      {user && (
        <button
          onClick={handleSaveArticle}
          className="absolute shadow-xl right-3 top-3 w-7 h-7 p-1 rounded bg-gray-200 focus:outline-none"
        >
          {isSaved ? <img src={HeartIcon} /> : <img src={NoHeartIcon} />}
        </button>
      )}

      <p className="flex m-0 text-gray-400">
        <span className={`${_author.length > 30 ? 'truncate w-52' : ''}`}>{_author}</span>&nbsp;- {_publishedAt}
      </p>
      <Link onClick={() => saveId(_id)} to={`/newsList/${encodeURI(title)}`}>
        <h1 className="text-lg hover:text-blue-500 transform duration-300">{title}</h1>
      </Link>
      <LineEllispsis text={content} maxLine="3" ellipsis="..." trimRight basedOn="letters" className="text-gray-500" />
    </div>
  );
};

export default ArticleThumbnail;
