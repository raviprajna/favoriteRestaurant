import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Map as LeafLetMap, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({
  parentProps,
  selectedRestaurantPosition,
  filteredRestaurants
}) {
  const state = parentProps.restaurants;
  return (
    <Grid item xs={12} md={6}>
      <Paper>
        <LeafLetMap
          style={{ height: "80vh" }}
          center={selectedRestaurantPosition}
          zoom="13"
        >
          {filteredRestaurants.map(restaurant => (
            <Marker
              position={restaurant.geoCode}
              onClick={() => parentProps.selectRestaurant(restaurant.id)}
            >
              <Popup>
                {restaurant.name} <br /> {restaurant.favoriteFood}
              </Popup>
            </Marker>
          ))}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
        </LeafLetMap>
      </Paper>
    </Grid>
  );
}
