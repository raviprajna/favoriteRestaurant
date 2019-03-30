import { createAction, createReducer } from "redux-act";
import * as globalActions from "../../common/reducer/sharedReducer.js";
import data from "./data.js";
// ------------------------------------
// Actions
// ------------------------------------
export const addRestaurant = createAction("restaurants/addRestaurant");
export const deleteRestaurant = createAction("restaurants/deleteRestaurant");
export const setAddModalKeyValue = createAction(
  "restaurants/setAddModalKeyValue"
);
export const sortRestaurant = createAction("restaurants/sortRestaurant");
export const filterRestaurantByName = createAction(
  "restaurants/filterRestaurantByName"
);
export const setDefaults = createAction("restaurants/setDefaults");
export const setGeoLocation = createAction("restaurants/setGeoLocation");
export const selectRestaurant = createAction("restaurants/selectRestaurant");
export const toggleDisplayKey = createAction("restaurants/toggleDisplayKey");

export const init = () => {
  return dispatch => {
    // dispatch(setDefaults());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        dispatch(setGeoLocation(position))
      );
    } else dispatch(setGeoLocation(null));
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setDefaults]: (state, action) => {
    state.restaurants = data.restaurants;
    state.hasMore = data.hasMore;
    return state;
  },
  [setGeoLocation]: (state, action) => {
    let position = action.payload;
    if (position) {
      state.addModalContent.geoCode = [
        position.coords.latitude,
        position.coords.longitude
      ];
      state.hasMapSupport = true;
    } else state.hasMapSupport = false;
    /*
        NOte : For Google MAP Integration
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        let map_key = "AIzaSyBSK1cQZHNMfM9tA03sQNiLgVgtNHjnMsA007";
        state.addModalContent.mapLocation =
        "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key="+map_key;
        */
    return state;
  },
  [addRestaurant]: (state, action) => {
    if (
      state.restaurants.filter(item => item.name == action.payload.name)
        .length == 0
    ) {
      action.payload.id = state.sequence++;
      action.payload.geoCode = action.payload.geoCode;
      state.restaurants.unshift({ ...action.payload });
      state.display.showAddPanel = false;
      state.display.addError = "";
      state.addModalContent.name = "";
      state.addModalContent.favoriteFood = "";
      state.addModalContent.stars = "";
    } else {
      state.display.showAddPanel = true;
      state.display.addError = "Duplicate Restaurant Name";
    }
    return state;
  },
  [selectRestaurant]: (state, action) => {
    let selectedRestaurant = state.restaurants.filter(
      res => res.id == action.payload
    )[0];
    state.selectedRestaurant.geoCode = selectedRestaurant.geoCode;
    state.selectedRestaurant.id = selectedRestaurant.id;
    return state;
  },
  [sortRestaurant]: (state, action) => {
    if (state.sortDesc)
      state.restaurants.sort((res1, res2) =>
        res2.name.localeCompare(res1.name)
      );
    else
      state.restaurants.sort((res1, res2) =>
        res1.name.localeCompare(res2.name)
      );
    state.sortDesc = !state.sortDesc;
    return state;
  },
  [filterRestaurantByName]: (state, action) => {
    state.filter.name = action.payload;
    return state;
  },
  [deleteRestaurant]: (state, action) => {
    let index = state.restaurants.findIndex(
      restaurant => restaurant.id == action.payload
    );
    state.restaurants.splice(index, 1);
    return state;
  },
  [setAddModalKeyValue]: (state, action) => {
    state.addModalContent[action.payload.key] = action.payload.value;
    return state;
  },
  [toggleDisplayKey]: (state, action) => {
    state.display[action.payload] = !state.display[action.payload];
    return state;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  let returnState = handler ? handler(state, action) : state;
  return { ...returnState };
}

// ------------------------------------
// INITIAL STATE
// ------------------------------------
export const initialState = {
  restaurants: [],
  sortDesc: false,
  filter: { name: "" },
  hasMore: false,
  hasMapSupport: false,
  sequence: 2,
  addModalContent: {
    name: "",
    favoriteFood: "",
    stars: "",
    geoCode: null,
    id: ""
  },
  selectedRestaurant: { id: 0, geoCode: null },
  display: {
    showAddPanel: false,
    addError: ""
  }
};
