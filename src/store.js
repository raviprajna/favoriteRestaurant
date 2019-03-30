import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer, { injectReducer } from "./rootReducer.js";

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.APPLICATION_PROFILE != "prod") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export function replaceReducerFunc(path) {
  // 1. Get path from URL like host/path, path?pathParam=value
  path = path.split("/")[1].split("?")[0];
  // 2. Default path is home so pick the home state
  path = path === "" ? "home" : path;
  store.replaceReducer(injectReducer(path));
}

export default store;
