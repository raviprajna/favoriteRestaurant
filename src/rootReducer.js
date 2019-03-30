import { combineReducers } from "redux";
import sharedReducer from "./common/reducer/sharedReducer.js";
import allReducers from "./routes/allReducers.js";

/*
Note : If we need router changes to be handled via redux
import { routerReducer } from "react-router-redux";
const defaultReducer = { router: routerReducer, shared: sharedReducer };
*/

const defaultReducer = { shared: sharedReducer };

const combinedReducer = combineReducers({
  ...defaultReducer,
  ...allReducers
});

export default combinedReducer;

// TODO : Work on managing shared state.
export const injectReducer = reducerKey => {
  let injectedReducers = {};
  injectedReducers[reducerKey] = allReducers[reducerKey];
  return combineReducers({
    ...defaultReducer,
    ...injectedReducers
  });
};
