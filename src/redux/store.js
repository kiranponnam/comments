import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./Session/session.slice";
import commentReducer from "./Comments/comments.slice";
const store = configureStore({
  reducer: { session: sessionReducer, comments: commentReducer },
});
export default store;
