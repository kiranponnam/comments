import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import {
  createComment,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  commentVoteCount,
} from "../../redux/Comments/comments.slice";

const Comments = (props: any) => {
  const currentUserId = props?.currentUserId;
  const [backendComments, setBackendComments] = useState<any>([]);
  const [activeComment, setActiveComment] = useState<any>(null);
  const rootComments = backendComments.filter(
    (backendComment: any) => backendComment?.parentId === null
  );
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state?.session);
  const userComments = useSelector((state: any) => state?.comments?.data);

  const getReplies = (commentId: any) =>
    backendComments
      .filter((backendComment: any) => backendComment.parentId === commentId)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  useEffect(() => {
    if (userComments) {
      setBackendComments(userComments);
      setActiveComment(null);
    }
  }, [userComments]);

  const addComment = (text: string, parentId: any) => {
    dispatch(
      createComment({
        text: text,
        parentId: parentId,
        username: userData?.data?.payload?.name,
        image: userData?.data?.payload?.picture,
      })
    );
  };

  const updateComment = (text: string, commentId: string) => {
    dispatch(updateCommentApi({ text: text, commentId: commentId }));
  };
  const deleteComment = (commentId: string) => {
    dispatch(deleteCommentApi(commentId));
  };
  const commentVoteCountHandler = (voteCount: number, commentId: string) => {
    dispatch(commentVoteCount({ voteCount: voteCount, commentId: commentId }));
  };
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments?.map((rootComment: any) => (
          <Comment
            key={rootComment?.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            commentVoteCountHandler={commentVoteCountHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
