import React from "react";

/**
 * ErrorBoundary catches render-time crashes in the React tree.
 * It renders the provided `fallback` component (which can use hooks).
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Render error caught by ErrorBoundary:", error, info);
  }

  render() {
    const { children, fallback: Fallback, fallbackProps } = this.props;
    const { error } = this.state;

    if (error) {
      return <Fallback error={error} {...fallbackProps} />;
    }

    return children;
  }
}

export default ErrorBoundary;

