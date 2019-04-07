import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./restaurants-reducer.js";

// Material UI Imports
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

// Sub component imports
import RestaurantCard from "./subComponent/restaurantCard.js";
import AddRestaurant from "./subComponent/addRestaurant.js";
import MapView from "./subComponent/mapView.js";
import ListView from "./subComponent/listView.js";

class Restaurants extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    let state = this.props.restaurants;
    const currentPosition = state.addModalContent.geoCode;
    const selectedRestaurantPosition = state.selectedRestaurant.geoCode
      ? state.selectedRestaurant.geoCode
      : currentPosition;
    const filteredRestaurants = state.restaurants.filter(
      restaurant =>
        restaurant.name
          .toUpperCase()
          .indexOf(state.filter.name.toUpperCase()) != -1
    );

    return (
      <div style={{ margin: "2em" }}>
        <br />
        <AddRestaurant
          parentProps={this.props}
          currentPosition={currentPosition}
          addError={state.display.addError}
          showAddPanel={state.display.showAddPanel}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              style={{
                overflowY: "scroll",
                maxHeight: "80vh",
                minHeight: "80vh",
                minWidth: "100%"
              }}
            >
              <ListView parentProps={this.props} />
              {filteredRestaurants.length == 0 ? (
                <div style={{ margin: "20px" }}>
                  {" "}
                  No Restaurants in the List.
                </div>
              ) : (
                <List>
                  {filteredRestaurants.map((restaurant, index) => (
                    <RestaurantCard
                      restaurant={restaurant}
                      selected={restaurant.id == state.selectedRestaurant.id}
                      index={index}
                      parentProps={this.props}
                    />
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
          <MapView
            height={"80vh"}
            parentProps={this.props}
            selectedRestaurantPosition={selectedRestaurantPosition}
            filteredRestaurants={filteredRestaurants}
          />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants
});

/*
TODO : Fix this code block to enable Reselect
const getMapStateToProps = () => {
 const memorizedRestaurants = getMemorizedRestaurants()
 const mapStateToProps = (state, props) => {
   return {
      restaurants : memorizedRestaurants(state.restaurants, props)
   }
  }
 return mapStateToProps
}
*/

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants);
