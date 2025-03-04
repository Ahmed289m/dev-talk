"use client";
const { store } = require("@/redux/store");
const { Provider } = require("react-redux");

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
