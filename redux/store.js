const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "./authSlice";
import postReducer from "./postSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
