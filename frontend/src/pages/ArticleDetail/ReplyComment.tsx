import React from 'react';
import SingleComment from './SingleComment';

const ReplyComment = ({ commentList, parentId, setReplying, setParentComment }: any) => {
  const render = () =>
    commentList.map((item: any, i: number) => {
      return (
        item.parentId === parentId && (
          <div style={{ marginLeft: '40px' }} key={i}>
            <SingleComment
              comment={item}
              setReplying={setReplying}
              setParentComment={setParentComment}
              commentList={commentList}
            />
            <ReplyComment
              commentList={commentList}
              parentId={item.id}
              setReplying={setReplying}
              setParentComment={setParentComment}
            />
          </div>
        )
      );
    });

  return render();
};

export default ReplyComment;
