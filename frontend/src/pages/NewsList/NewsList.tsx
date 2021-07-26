import ArticleThumbnail from 'components/ArticleThumbnail';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { stringQuery } from 'helpers/common';
import { Pagination } from 'antd';
import { contentRef } from 'components/Layout';
import { RootState } from 'redux/reducers';
import { createParams } from 'redux/actions/ui';
import { getArticles } from 'redux/actions/articles';
import LoadingScreen from 'components/LoadingScreen';
import { getNumArticleByText, getNumArticles } from 'redux/api/articles';

const NewsList = () => {
  const articlesRedux = useSelector((state: RootState) => state.articles.articles);
  const savedTempArticles = useSelector((state:RootState)=> state.ui.savedArticles)
  const savedArticles = useSelector((state:RootState) => state.users.savedArticles)
  const _savedArticles = savedTempArticles?savedTempArticles:savedArticles
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [articles, setArticles] = useState<any>([])
  const queries = useSelector((state: RootState) => state.ui.params);
  const postsPerPage = 7;
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation()
    .pathname.split('/')
    .filter((x) => x)[0];

  const category = () => {
    if (['entertainment', 'business', 'health', 'science', 'sports', 'technology'].includes(location)) {
      return location;
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    history.push({
      search: '?' + stringQuery(queries),
    });

    setCurrentPage(queries?.page ? queries.page : 1);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const filteredArticles = _savedArticles?.filter((item:any) => {
      const convertIdToCategory = (id:string|undefined) => {
        switch (id) {
          case '607e947bf3dd19388417299a': return 'Entertainment';
          case '607e94b0c4a38c38846988ec': return 'Business';
          case '607e94bc8aafce3884b279ae':return 'Health';
          case '608fa0900819f662099759a2':return 'Sports';
          case '608fa0a20819f662099759a4':return 'Science';
          case '608fa0aa0819f662099759a5': return 'Technology';
          default: return '';
        }
      }
      const _category = convertIdToCategory(item.category)

      const text = queries?.search ? queries?.search.toLowerCase() : ""
      const matchTitle = item.title?.toLowerCase().includes(text)
      const matchAuthor = (item.author? item.author : item.source).toLowerCase().includes(text)
      const matchCategory = _category.toLowerCase().includes(text)

      return matchTitle || matchAuthor || matchCategory
    })

    if (location == 'savedNews') {
      setArticles(filteredArticles?.slice(indexOfFirstPost, indexOfLastPost))
      setTotal(_savedArticles?_savedArticles.length:0)
    } else {
      dispatch(getArticles({ skip: indexOfFirstPost, limit: postsPerPage, text: queries?.search, category: category() }));
      setArticles(articlesRedux)
      if (queries?.search) {
        getNumArticleByText({ text: queries?.search, category:category() }).then((res) => {
          setTotal(res);
        });
      } else {
        getNumArticles({ category: category() }).then((res) => {
          setTotal(res.data.size);
        });
      }
    }

    contentRef.current?.scrollTo(0, 0);
  }, [
    JSON.stringify(articlesRedux),
    JSON.stringify(queries),
    JSON.stringify(savedArticles),
    JSON.stringify(articles)
  ]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      {articles?.length == 0 && <div className="text-gray-500 mb-5">No articles found</div>}
      {articles && articles.map((item: any, i: number) => <ArticleThumbnail key={i} {...item} location={location} article={item} />)}
      <Pagination
        className="absolute bottom-72"
        current={currentPage}
        onChange={(page) => {
          dispatch(createParams({ page }));
          setCurrentPage(page);
        }}
        total={total}
        defaultPageSize={postsPerPage}
        showSizeChanger={false}
      />
    </div>
  );
};

export default NewsList;
