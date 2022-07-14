import { createSlice } from "@reduxjs/toolkit";
import data from "../../DB/data.json";

const initialState = {
  data: data,
} as any;
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    unmountSession: (state: any, action: any) => {
      state.data = {};
    },
    createComment: (state: any, action: any) => {
      const newComment = {
        id: Math.random().toString(36).substr(2, 9),
        body: action?.payload.text,
        parentId:
          action?.payload.parentId === undefined
            ? null
            : action?.payload.parentId,
        userId: "1",
        username: action?.payload.username,
        createdAt: new Date().toISOString(),
        image: action?.payload.image,
        voteCount:
          action?.payload?.voteCount !== undefined
            ? action?.payload?.voteCount
            : 0,
      };
      state.data.unshift(newComment);
    },
    updateComment: (state: any, action: any) => {
      const updatedBackendComments = state.data.map((backendComment: any) => {
        if (backendComment.id === action.payload.commentId) {
          return { ...backendComment, body: action.payload.text };
        }
        return backendComment;
      });
      state.data = updatedBackendComments;
    },

    deleteComment: (state: any, action: any) => {
      const newComments = state.data?.filter((comment: any) => {
        return comment.id !== action.payload;
      });
      state.data = newComments;
    },
    commentVoteCount: (state: any, action: any) => {
      const updatedBackendComments = state.data.map((backendComment: any) => {
        if (backendComment.id === action.payload.commentId) {
          return { ...backendComment, voteCount: action.payload.voteCount };
        }
        return backendComment;
      });
      state.data = updatedBackendComments;
    },
  },
});
export const {
  createComment,
  unmountSession,
  updateComment,
  deleteComment,
  commentVoteCount,
} = commentsSlice.actions;
export default commentsSlice.reducer;
