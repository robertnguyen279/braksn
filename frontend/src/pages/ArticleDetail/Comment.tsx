import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { reducerSetShownComment } from 'redux/actions/ui';

const Comment = ({ item, commentList, setReplying, setParentComment, rangeComments }: any) => {
  const dispatch = useDispatch();
  const [numOfCmt, setNumOfCmt] = useState(0);
  const [isShownComment, setShownComment] = useState(false);
  const shownComment = useSelector((state: RootState) => state.ui.shownComment);
  const loop = (parentId: string, commentList: any[], num: number) => {
    commentList.forEach((replyComment) => {
      if (replyComment.parentId == parentId) {
        num++;
        num = loop(replyComment.id, commentList, num);
      }
    });
    return num;
  };

  useEffect(() => {
    if (item.id == shownComment?.commentId) {
      setShownComment(shownComment?.value);
    } else {
      setShownComment(false);
    }

    let num = 0;
    if (!item.parentId) {
      num = loop(item.id, commentList, num);
    }
    setNumOfCmt(num);
  }, [JSON.stringify(commentList), isShownComment, JSON.stringify(shownComment)]);

  return (
    <React.Fragment>
      <SingleComment
        comment={item}
        setReplying={setReplying}
        setParentComment={setParentComment}
        setShownComment={setShownComment}
        rangeComments={rangeComments}
      />
      {numOfCmt != 0 && (
        <div
          onClick={() => dispatch(reducerSetShownComment(!isShownComment, item.id))}
          className="text-blue-500 ml-4 cursor-pointer w-max"
        >
          {isShownComment ? 'Hide' : 'Show'} {numOfCmt} replies
        </div>
      )}

      {isShownComment && (
        <ReplyComment
          commentList={commentList}
          parentId={item.id}
          setReplying={setReplying}
          setParentComment={setParentComment}
          setShownComment={setShownComment}
        />
      )}
    </React.Fragment>
  );
};

export default Comment;
