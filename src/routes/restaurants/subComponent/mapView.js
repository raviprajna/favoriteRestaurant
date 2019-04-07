import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  Map as LeafLetMap,
  TileLayer,
  Marker,
  Popup,
  Circle
} from "react-leaflet";

export default class MapView extends React.Component {
  componentDidMount() {
    LeafLetMap;
    Marker;
    Popup;
  }
  render() {
    let parentProps = this.props.parentProps;
    let selectedRestaurantPosition = this.props.selectedRestaurantPosition;
    let filteredRestaurants = this.props.filteredRestaurants;
    let selectable = this.props.selectable;
    let height = this.props.height;

    return (
      <Grid item xs={12} md={6}>
        <Paper>
          <LeafLetMap
            style={{ height }}
            center={selectedRestaurantPosition}
            zoom="13"
            onClick={event => {
              selectable && parentProps.getAddressFromGeoCode(event.latlng);
            }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {filteredRestaurants.map(restaurant => (
              <Marker
                position={restaurant.geoCode}
                onClick={event => {
                  selectable
                    ? parentProps.setAddModalKeyValue({
                        key: "geoCode",
                        value: event.latlng
                      })
                    : parentProps.selectRestaurant(restaurant.id);
                }}
              >
                <Popup>
                  <b>{restaurant.name} </b> <br /> {restaurant.favoriteFood}
                </Popup>
                <Circle
                  center={selectedRestaurantPosition}
                  fillColor="green"
                  color="green"
                  radius={250}
                />
              </Marker>
            ))}
          </LeafLetMap>
        </Paper>
      </Grid>
    );
  }
}
