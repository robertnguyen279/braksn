import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from 'redux/actions/articles';
import { RootState } from 'redux/reducers';
import Comment from './Comment';

let tempComments: any[];
let setTempComments: React.Dispatch<React.SetStateAction<any[]>>;

const CommentList = ({ setReplying, setParentComment, articleId }: any) => {
  const user = useSelector((state: RootState) => state.users.user);
  const [rangeComments, setRangeComment] = useState<any[]>([]);
  const [loadmoreComment, setLoadMoreComment] = useState(3);
  [tempComments, setTempComments] = useState<any[]>([]);
  const [parentCommentList, setParentCommentList] = useState<any[]>([]);
  const comments = useSelector((state: RootState) => state.articles.comments);
  const dispatch = useDispatch();

  const commentList = () => {
    const commentArr: any[] = [];

    if (comments) {
      comments
        .sort((a: any, b: any) => {
          return a.createAt > b.createAt ? 1 : -1;
        })
        .sort((a: any) => {
          return a.userId == user?._id ? -1 : 1;
        })
        .forEach((item: any) => {
          commentArr.push(item);
        });
    }

    return commentArr;
  };

  // const parentCommentList = commentList().filter((comment: any) => !comment.parentId)

  useEffect(() => {
    dispatch(getComments({ articleId }));
    setTempComments(commentList());
    setParentCommentList(tempComments.filter((comment: any) => !comment.parentId));
    setRangeComment(parentCommentList.splice(0, loadmoreComment));
  }, [loadmoreComment, JSON.stringify(comments), JSON.stringify(parentCommentList), JSON.stringify(tempComments)]);

  const renderComments = () => (
    <div>
      <h1>{tempComments?.length} Comments</h1>
      {rangeComments.map(
        (item: any, i: number) =>
          !item.parentId && (
            <Comment
              key={i}
              item={item}
              commentList={tempComments}
              rangeComments={rangeComments}
              setReplying={setReplying}
              setParentComment={setParentComment}
            />
          ),
      )}
      {rangeComments.length != parentCommentList.length && (
        <div className="cursor-pointer mt-5 text-blue-500" onClick={() => setLoadMoreComment(loadmoreComment + 3)}>
          Load more comment...
        </div>
      )}
    </div>
  );

  return <div>{tempComments?.length > 0 ? renderComments() : <div className="text-gray-500">No comments</div>}</div>;
};

export { tempComments, setTempComments };
export default CommentList;
