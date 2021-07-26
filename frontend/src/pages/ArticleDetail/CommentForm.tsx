import React, { useRef } from 'react';
import { useFormik } from 'formik';
import SendIcon from 'assets/icons/send.svg';
import { useDispatch } from 'react-redux';
import { createComment } from 'redux/actions/articles';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import TextAreaAutoSize from 'react-textarea-autosize';
import { reducerSetNewComment, reducerSetShownComment } from 'redux/actions/ui';

let commentFormRef: any;

const CommentForm = ({ articleId, user, parentComment, setParentComment, isReplying, setReplying }: any) => {
  const dispatch = useDispatch();
  commentFormRef = useRef<HTMLDivElement>(null);
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: ({ comment }) => {
      const commentObj = {
        userAvatar: user.avatar ? user.avatar : null,
        userId: user?._id,
        id: uuid(),
        username: user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : user?.email,
        comment,
        parentId: parentComment ? parentComment.id : null,
        createAt: moment().valueOf(),
      };

      formik.setValues({ comment: '' });
      dispatch(createComment({ articleId, comment: commentObj }));
      dispatch(reducerSetNewComment(commentObj.id));
      if (!parentComment?.parentId) {
        dispatch(reducerSetShownComment(true, parentComment?.id));
      }
    },
    validate: (values) => {
      const error: any = {};
      if (!values.comment) error.comment = '';
      return error;
    },
  });

  return (
    <div className="mb-5">
      {isReplying && (
        <div className="ml-5 flex text-gray-500">
          <div className="mr-5">Is replying to {parentComment.username}...</div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setParentComment(undefined);
              setReplying(false);
            }}
          >
            Cancel
          </div>
        </div>
      )}
      <form
        className="flex w-full relative border border-gray-300 py-2 px-4 rounded-3xl items-center"
        onSubmit={formik.handleSubmit}
      >
        <TextAreaAutoSize
          ref={commentFormRef}
          className="resize-none w-full overflow-hidden focus:outline-none"
          id="comment"
          placeholder="Leave your comments..."
          {...formik.getFieldProps('comment')}
        />
        <div className="flex items-end self-stretch">
          <button type="submit" className="focus:outline-none">
            <img className="w-6" src={SendIcon} />
          </button>
        </div>
      </form>
    </div>
  );
};

export { commentFormRef };
export default CommentForm;
