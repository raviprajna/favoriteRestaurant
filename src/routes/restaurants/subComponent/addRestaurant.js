import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Map as LeafLetMap, TileLayer, Marker, Popup } from "react-leaflet";
import Modal from "@material-ui/core/Modal";
import MapView from "./mapView.js";

export default function AddRestaurant({
  parentProps,
  currentPosition,
  addError,
  showAddPanel
}) {
  const state = parentProps.restaurants;
  return (
    <Modal
      style={{ margin: "2em" }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={showAddPanel}
      onClose={() => parentProps.toggleDisplayKey("showAddPanel")}
    >
      <Paper style={{ padding: "1em 2em" }}>
        <h3>
          {" "}
          <b>Add Restaurant </b>
        </h3>
        <hr />
        <form
          onSubmit={e => {
            parentProps.addRestaurant(state.addModalContent);
            e.preventDefault();
          }}
        >
          <Grid container spacing={4}>
            <Grid xs={12} sm={12} md={6}>
              <br />
              <div>Restaurant Name</div>
              <input
                type="text"
                id="name"
                required="required"
                maxlength="50"
                value={state.addModalContent.name}
                onChange={event =>
                  parentProps.setAddModalKeyValue({
                    key: "name",
                    value: event.target.value
                  })
                }
                pattern="([A-Za-z0-9 ]+)([A-Za-z0-9 ]+)"
                title="Enter only Alpha numeric, Minimum 2 character required and Max length is 50"
              />

              {addError && (
                <div style={{ color: "red" }}>
                  <br /> {addError}
                  <br />
                </div>
              )}

              <br />
              <br />
              <div> Favorite Food </div>
              <input
                type="text"
                id="fav"
                maxlength="50"
                value={state.addModalContent.favoriteFood}
                onChange={event =>
                  parentProps.setAddModalKeyValue({
                    key: "favoriteFood",
                    value: event.target.value
                  })
                }
                pattern="^[a-zA-Z0-9 ]+$"
                title=" Enter only alpha numeric value. Space is allowed and Max length is 50"
              />
              <br />
              <br />
              <div>Select Address</div>
              <input
                type="text"
                id="name"
                required="required"
                value={state.addModalContent.address}
                onChange={event => {
                  parentProps.setAddModalKeyValue({
                    key: "address",
                    value: event.target.value
                  });
                }}
                onBlur={event => {
                  parentProps.getGeoCode(event.target.value);
                }}
                placeholder=" Enter exact location, or choose in the map to auto populate this field "
                title={
                  state.addModalContent.address
                    ? state.addModalContent.address
                    : " Enter exact location, or choose in the map to auto populate this field"
                }
              />
              <br />
              <br />
              <div> Rating </div>
              <input
                value={state.addModalContent.stars}
                type="number"
                name="stars"
                min="0"
                max="5"
                onChange={event =>
                  parentProps.setAddModalKeyValue({
                    key: "stars",
                    value: event.target.value
                  })
                }
              />
              <br />
              <div>
                <br />
                <Button variant="contained" color="primary" type="submit">
                  Save Restaurant{" "}
                </Button>
              </div>
            </Grid>

            <MapView
              parentProps={parentProps}
              selectedRestaurantPosition={state.addModalContent.geoCode}
              filteredRestaurants={[{ geoCode: state.addModalContent.geoCode }]}
              selectable={true}
              height={"60vh"}
            />
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
}
