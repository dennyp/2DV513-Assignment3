import React, { Component } from 'react'

/**
 * ErrorBoundary component which handles errors and shows a fallback UI.
 * Greatly inspired of the React Docs.
 */
export class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
