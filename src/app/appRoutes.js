import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { replaceReducerFunc } from "../store.js";
import { connect } from "react-redux";

import ErrorBoundary from "./errorBoundary.js";
import Loading from "../common/components/loading";
import CustomError from "../common/components/error";

// Add new Routes
const Restaurants = React.lazy(() => import("../routes/restaurants"));

class AppRoutes extends Component {
  render() {
    // TODO : Fix infinite state update then use
    // onEnter={replaceReducerFunc(window.location.pathname)}
    const sharedState = this.props.shared;
    return (
      <div style={{ marginTop: "4em" }}>
        {sharedState.display.showLoader && <Loading />}
        {sharedState.display.showErrorModal && (
          <CustomError error={sharedState.display.error} />
        )}
        <BrowserRouter onEnter={console.log(window.location.pathname)}>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Route exact path="/" component={Restaurants} />
              <Route exact path="/restaurants" component={Restaurants} />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.shared
});

export default connect(
  mapStateToProps,
  null
)(AppRoutes);
