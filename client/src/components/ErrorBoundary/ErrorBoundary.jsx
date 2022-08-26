import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    // this.setState({
    //   error: error,
    //   errorInfo: errorInfo,
    // });
    console.log(`Logging error: ${error}`);
    // You can also log error messages to an error reporting service here
    console.log(`Soy el errorInfo: ${errorInfo}`);
  }

  render() {
    if (this.state.hasError) {
      // Error path
      return <h2>Something went wrong </h2>;
    }
    // Normally, just render children
    return this.props.children;
  }
}
