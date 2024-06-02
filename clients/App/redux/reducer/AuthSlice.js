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
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;
      const user = {
        username: payload.username,
        email: payload.email,
        profile_picture: payload.profile_picture,
      };
      return user;
    },
  },
});

export const { AUTH_CHECK } = authSlice.actions;
