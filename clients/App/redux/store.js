import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./reducer/AuthSlice";
import searchReducer from "./reducer/ProductSlice";

const RootReducer = combineReducers({
  auth: authSlice.reducer,
  search: searchReducer,
});

export default RootReducer;
