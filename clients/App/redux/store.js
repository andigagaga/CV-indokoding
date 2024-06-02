import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./reducer/AuthSlice";

const RootReducer = combineReducers({
  auth: authSlice.reducer,
});

export default RootReducer;
