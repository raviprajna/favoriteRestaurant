import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import SortIcon from "@material-ui/icons/Sort";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";

export default function ListView({ parentProps }) {
  const state = parentProps.restaurants;
  return (
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
                parentProps.filterRestaurantByName(event.target.value)
              }
            />
          </ListItemText>
          <ListItemSecondaryAction>
            <Fab
              color="primary"
              aria-label="Add"
              size="small"
              onClick={() => parentProps.toggleDisplayKey("showAddPanel")}
            >
              <Tooltip title=" ADD RESTAURANT ">
                <AddIcon />
              </Tooltip>
            </Fab>
            <IconButton aria-label="Sort">
              <Tooltip
                title={
                  state.sortDesc ? " SORT BY NAME (DESC)" : "SORT BY NAME (ASC)"
                }
              >
                <SortIcon onClick={() => parentProps.sortRestaurant()} />
              </Tooltip>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  );
}
