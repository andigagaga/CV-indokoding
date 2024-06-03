import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  profile_picture: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH_CHECK: (state, action) => {
      const { username, email, profile_picture } = action.payload;
      return {
        ...state,
        username,
        email,
        profile_picture,
      };
    },
  },
});

export const { AUTH_CHECK } = authSlice.actions;
