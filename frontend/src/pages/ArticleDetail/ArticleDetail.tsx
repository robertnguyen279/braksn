import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import moment from 'moment';
import NoImage from 'assets/images/no-image-available.jpg';
import { reducerSetNewComment, setLoading } from 'redux/actions/ui';
import { getContentArticle } from 'redux/api/articles';
import { Link, useHistory } from 'react-router-dom';
import { contentRef } from 'components/Layout';
import { getDetailArticle } from 'redux/actions/articles';
import LoadingScreen from 'components/LoadingScreen';
import { updateSavedArticle } from 'redux/actions/users';
import { setTempSavedArticle } from 'redux/actions/ui';
import NoHeartIcon from 'assets/icons/no-heart.svg';
import HeartIcon from 'assets/icons/heart.svg';
import VoiceText from './VoiceText';

const ArticleDetail = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const globalArticleId = localStorage.getItem('articleId');
  const article = useSelector((state: RootState) => state.articles.article);
  const savedTempArticles = useSelector((state: RootState) => state.ui.savedArticles);
  const savedArticles = useSelector((state: RootState) => state.users.savedArticles);
  const articles = savedTempArticles ? savedTempArticles : savedArticles;
  const [isReplying, setReplying] = useState(false);
  const [parentComment, setParentComment] = useState(undefined);
  const [content, setContent] = useState<any>('');
  const [tags, setTags] = useState([]);
  const [isLoadingContent, setLoadingContent] = useState(true);
  const [isSaved, setSaved] = useState(false);
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const [isFailed, setFailed] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const author = article?.author ? article?.author : article?.source;
  const publishedAt = moment(article?.publishedAt).format('DD MMM YYYY');

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
    setSaved(articles?.map((x: any) => x._id).includes(article?._id));
    dispatch(getDetailArticle({ articleId: globalArticleId }));
    dispatch(reducerSetNewComment(''));
    getContentArticle({ url: article?.url })
      .then((res) => {
        setContent(res.data.article);
        setTags(res.data.tags);
        setFailed(false);
        setLoadingContent(false);
        dispatch(setLoading(false));
      })
      .catch(() => {
        setContent('Failed to load content.');
        setLoadingContent(false);
        setFailed(true);
        dispatch(setLoading(false));
      });
  }, [JSON.stringify(article?._id), isLoadingContent, content]);

  useEffect(() => {
    setSaved(articles?.map((x: any) => x._id).includes(article?._id));
  }, []);

  const handleSaveArticle = () => {
    setSaved(!isSaved);
    dispatch(setTempSavedArticle({ todo: isSaved ? 'remove' : 'save', article, articles }));
    dispatch(updateSavedArticle({ todo: isSaved ? 'remove' : 'save', articleId: article?._id }));
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <h1 className="text-lg">{article?.title}</h1>
      <p className="m-0 text-gray-400 mb-5">
        {author} - {publishedAt}
      </p>
      <div className="relative mb-5">
        <div className="w-full h-64 rounded-md shadow-xl">
          <img
            className="object-cover w-full h-full overflow-hidden"
            onError={(e) => {
              e.currentTarget.onerror == null;
              e.currentTarget.src = NoImage;
            }}
            src={article?.urlToImage ? article?.urlToImage : NoImage}
          />
          {user && (
            <button
              onClick={handleSaveArticle}
              className="absolute shadow-xl right-3 top-3 w-7 h-7 p-1 rounded bg-gray-200 focus:outline-none"
            >
              {isSaved ? <img src={HeartIcon} /> : <img src={NoHeartIcon} />}
            </button>
          )}
        </div>

        <div
          onClick={() => {
            history.push(`/${article?.category.name.toLowerCase()}`);
          }}
          className={`absolute rounded bg-${colorByCat(article?.category.name)} p-2 font-semibold 
                        top-3 left-3 text-white z-10 cursor-pointer`}
        >
          {article?.category.name}
        </div>
      </div>
      <VoiceText content={content} articleId={article?._id} />
      <pre className="text-justify text-base font-normal font-serif leading-relaxed tracking-wide">
        {isLoadingContent ? 'Loading...' : content}
        {isFailed && (
          <p>
            See more at{' '}
            <a target="_blank" rel="noreferrer" href={article?.url}>
              this link.
            </a>
          </p>
        )}
      </pre>

      <div className="flex flex-wrap">
        <p className="m-0">Tags:</p>
        {tags.length > 0 &&
          tags.map((item: any, i: number) => (
            <p className="text-gray-500 m-0 ml-1 w-max" key={i}>
              #{item}
            </p>
          ))}
      </div>
      <div className="pt-5 mt-5 border-t border-gray-300">
        {!user ? (
          <div className="text-gray-500">
            You need to <Link to="/registerLogin">Sign in</Link> to comment
          </div>
        ) : (
          <CommentForm
            articleId={article?._id}
            user={user}
            parentComment={parentComment}
            setParentComment={setParentComment}
            isReplying={isReplying}
            setReplying={setReplying}
          />
        )}
        <CommentList setParentComment={setParentComment} setReplying={setReplying} articleId={article?._id} />
      </div>
    </div>
  );
};

export default ArticleDetail;
