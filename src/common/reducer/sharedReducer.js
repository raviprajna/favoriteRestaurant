import { createAction } from "redux-act";

// ------------------------------------
// Actions
// ------------------------------------
export const showHideLoadingComponent = createAction("SHARED/SHOW_LOADING");
export const showHideErrorModal = createAction("SHARED/SHOW_ERROR");

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [showHideLoadingComponent]: (state, payload) => {
    if(payload) state.display.loadCount = state.display.loadCount + 1;
    else state.display.loadCount = state.display.loadCount - 1;
    state.display.showLoader = state.display.loadCount == 0 ? false : true;
    return state;
  },
  [showHideErrorModal]: (state, payload) => {
    state.display.showLoader = false;
    state.display.showErrorModal = !state.display.showErrorModal;
    state.display.error = payload;
    return state;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  let returnState = handler ? handler(state, action.payload) : state;
  return { ...returnState };
}

// ------------------------------------
// INITIAL STATE
// ------------------------------------
export const initialState = {
  display: {
    showErrorModal: false,
    showLoader: false,
    loadCount : 0,
    error: { message: "", status: "", statusText: "", description: "" }
  }
};
