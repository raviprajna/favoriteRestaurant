import React, { Component } from "react";
import AppRoutes from "./appRoutes.js";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Favorite Restaurants
            </Typography>
          </Toolbar>
        </AppBar>

        <AppRoutes />
      </div>
    );
  }
}

export default App;
