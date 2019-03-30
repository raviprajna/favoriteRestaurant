import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./restaurants-reducer.js";
import RestaurantCard from "./restaurantCard.js";
import { Map as LeafLetMap, TileLayer, Marker, Popup } from "react-leaflet";
import AddRestaurant from "./addRestaurant.js";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import SortIcon from "@material-ui/icons/Sort";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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
        <ExpansionPanel
          expanded={state.display.showAddPanel}
          onChange={() => this.props.toggleDisplayKey("showAddPanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Add Restaurants</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <AddRestaurant
              parentProps={this.props}
              currentPosition={currentPosition}
              addError={state.display.addError}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Restaurant List</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
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
                  <Grid item xs={12}>
                    <List>
                      <ListItem>
                        <ListItemText>
                          <TextField
                            id="standard-name"
                            label="Filter by name"
                            margin="normal"
                            value={state.filter.name}
                            onChange={event =>
                              this.props.filterRestaurantByName(
                                event.target.value
                              )
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <Fab
                            color="primary"
                            aria-label="Add"
                            size="small"
                            onClick={() =>
                              this.props.toggleDisplayKey("showAddPanel")
                            }
                          >
                            <Tooltip title=" ADD RESTAURANT ">
                              <AddIcon />
                            </Tooltip>
                          </Fab>
                          <IconButton aria-label="Sort">
                            <Tooltip
                              title={
                                state.sortDesc
                                  ? " SORT BY NAME (DESC)"
                                  : "SORT BY NAME (ASC)"
                              }
                            >
                              <SortIcon
                                onClick={() => this.props.sortRestaurant()}
                              />
                            </Tooltip>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>

                  {filteredRestaurants.length == 0 ? (
                    <div style={{ margin: "20px" }}>
                      {" "}
                      No Restaurants in the List.
                    </div>
                  ) : (
                    <List>
                      {filteredRestaurants.map(restaurant => (
                        <RestaurantCard
                          restaurant={restaurant}
                          selected={
                            restaurant.id == state.selectedRestaurant.id
                          }
                          deleteRestaurant={this.props.deleteRestaurant}
                        />
                      ))}
                    </List>
                  )}
                </Paper>
              </Grid>

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
                        onClick={() =>
                          this.props.selectRestaurant(restaurant.id)
                        }
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
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
