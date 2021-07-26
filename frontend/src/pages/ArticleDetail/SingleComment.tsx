import React, { useEffect, useRef } from 'react';
import RepLyIcon from 'assets/icons/reply-message.svg';
import moment from 'moment';
import { commentFormRef } from './CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import { reducerSetShownComment } from 'redux/actions/ui';
import { RootState } from 'redux/reducers';
import NoProfile from 'assets/images/no-profile.jpg';

const SingleComment = ({ comment, setReplying, setParentComment, rangeComments }: any) => {
  const newComment = useSelector((state: RootState) => state.ui.newComment);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (newComment && comment.id == newComment.id) {
        ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }, 10);
  }, [JSON.stringify(rangeComments), newComment.id]);

  return (
    <div ref={ref} className="flex relative my-2 p-5 bg-gray-100 rounded-xl">
      <img className="w-8 h-8 rounded-xl mr-3" src={comment.userAvatar ? comment.userAvatar : NoProfile} />
      <div className="grid">
        <h2 className="truncate">{comment.username}</h2>
        <pre className="font-normal font-sans mb-1 break-words whitespace-pre-line">{comment.comment}</pre>
        <div className="text-gray-500 text-xs mb-1">{moment(comment.createAt).fromNow()}</div>
        <button
          onClick={() => {
            setParentComment(comment);
            setReplying(true);
            if (!comment.parentId) {
              dispatch(reducerSetShownComment(true, comment.id));
            }
            setTimeout(() => {
              commentFormRef.current?.focus({ preventScroll: true });
              commentFormRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, 2);
          }}
          className="flex bg-blue-500 w-max focus:outline-none py-1 px-2 rounded-lg items-center"
        >
          <img src={RepLyIcon} className="w-4 mr-1" />
          <div className="text-white text-xs font-semibold">Reply</div>
        </button>
      </div>
    </div>
  );
};

export default SingleComment;
