import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { getSession, saveSession } from "./session.service";
const initialState = { data: getSession() } as any;
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    unmountSession: (state: any, action: any) => {
      state.data = {};
    },
    updateSession: (state: any, action: any) => {
      state.data = action;
      saveSession(state.data);
    },
  },
});
export const { updateSession, unmountSession } = sessionSlice.actions;
export default sessionSlice.reducer;
