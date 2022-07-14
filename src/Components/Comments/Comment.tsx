import { Avatar, Tooltip } from "@mui/material";
import CommentForm from "./CommentForm";
import "./styles.css";
import ReplyIcon from "@mui/icons-material/Reply";
import ConfirmDialog from "../ConfirmDialog";
import React, { useState } from "react";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Comment = (props: any) => {
  const comment = props?.comment;
  const replies = props?.replies;
  const setActiveComment = props?.setActiveComment;
  const activeComment = props?.activeComment;
  const updateComment = props?.updateComment;
  const deleteComment = props?.deleteComment;
  const addComment = props?.addComment;
  const parentId = props?.parentId;
  const currentUserId = props?.currentUserId;

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const isEditing =
    activeComment &&
    activeComment.id === comment?.id &&
    activeComment?.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment?.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = +new Date() - +new Date(comment?.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment?.userId && replies?.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment?.userId && !timePassed;
  const replyId = parentId ? parentId : comment?.id;
  const createdAt = new Date(comment?.createdAt).toLocaleDateString();

  const onConfirm = (event: any) => {
    if (event === "confirm") {
      deleteComment(comment?.id);
    }
    setDialogOpen(false);
  };

  const increamentHandler = () => {
    props?.commentVoteCountHandler(comment?.voteCount + 1, comment?.id);
  };
  const decreamentHandler = () => {
    props?.commentVoteCountHandler(
      comment?.voteCount > 0 ? comment?.voteCount - 1 : 0,
      comment?.id
    );
  };

  return (
    <div key={comment?.id} className="comment">
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={onConfirm}
        dialogContentText={
          <>
            Are you sure you want to remove comment? <br />
            Please confirm
          </>
        }
        title={"Confirmation"}
      />

      <div className="controls-main-container">
        <div className="like-btn">
          <Tooltip title="Increase vote">
            <AddIcon
              onClick={increamentHandler}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
          <span>{comment?.voteCount}</span>
          <Tooltip title="Decrease vote">
            <RemoveIcon
              onClick={decreamentHandler}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      </div>
      <div className="comment-image-container">
        <Avatar src={comment?.image} style={{ margin: "2px" }} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment?.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment?.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment?.body}
            handleSubmit={(text: string) => updateComment(text, comment?.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment?.id, type: "replying" })
              }
            >
              <div className="replay-container">
                <ReplyIcon color="primary" /> Reply
              </div>
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment?.id, type: "editing" })
              }
            >
              <EditIcon color="primary" /> Edit
            </div>
          )}
          {canDelete && (
            <div className="comment-action" onClick={() => setDialogOpen(true)}>
              <DeleteOutline color="primary" /> Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            hasCancelButton
            handleCancel={() => {
              setActiveComment(null);
            }}
            handleSubmit={(text: string) => addComment(text, replyId)}
          />
        )}
        {replies?.length > 0 && (
          <div className="replies">
            {replies.map((reply: any) => (
              <Comment
                comment={reply}
                key={reply?.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment?.id}
                replies={[]}
                currentUserId={currentUserId}
                commentVoteCountHandler={props?.commentVoteCountHandler}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
