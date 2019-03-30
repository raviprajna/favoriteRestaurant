import React, { Component } from "react";
import CustomError from "../common/components/error";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // https://stackoverflow.com/questions/52962851/whats-the-difference-between-getderivedstatefromerror-and-componentdidcatch
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI.
      // IN dev mode both fallback UI and error log is shown on UI.
      return <CustomError />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
