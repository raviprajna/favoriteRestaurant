import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Map as LeafLetMap, TileLayer, Marker, Popup } from "react-leaflet";

export default function AddRestaurant({
  parentProps,
  currentPosition,
  addError
}) {
  const state = parentProps.restaurants;
  return (
    <form
      onSubmit={e => {
        parentProps.addRestaurant(state.addModalContent);
        e.preventDefault();
      }}
    >
      <Grid container spacing={12}>
        <Grid item xs={12} sm={4}>
          <div>Name</div>
          <br />
          <input
            type="text"
            id="name"
            required="required"
            value={state.addModalContent.name}
            onChange={event =>
              parentProps.setAddModalKeyValue({
                key: "name",
                value: event.target.value
              })
            }
            pattern="([A-Za-z0-9 ]+)([A-Za-z0-9 ]+)"
            title="Enter only Alpha numeric, Minimum 2 character required "
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <div> Favorite Food </div>
          <br />
          <input
            type="text"
            id="fav"
            value={state.addModalContent.favoriteFood}
            onChange={event =>
              parentProps.setAddModalKeyValue({
                key: "favoriteFood",
                value: event.target.value
              })
            }
            pattern="^[a-zA-Z0-9 ]+$"
            title=" Enter only alpha numeric value. Space is allowed"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <div> Rating </div>
          <br />
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
        </Grid>

        {addError && (
          <Grid item xs={12}>
            <span style={{ color: "red" }}>{addError}</span>
          </Grid>
        )}
        <Grid item xs={12}>
          <br />
          <div> Select Address </div>
          <br />
          <LeafLetMap
            style={{ height: "200px" }}
            center={currentPosition}
            zoom="13"
            onClick={event => {
              parentProps.setAddModalKeyValue({
                key: "geoCode",
                value: event.latlng
              });
            }}
          >
            <Marker position={currentPosition}>
              <Popup>Save Location</Popup>
            </Marker>

            <TileLayer
              attribution="Restaurant Map"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          </LeafLetMap>
          <br />

          <Button variant="contained" color="primary" type="submit">
            Save Restaurant{" "}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
