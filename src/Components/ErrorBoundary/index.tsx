import { Button } from "@mui/material";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{textAlign:'center'}}>
          <h1>Sorry.. there was an error, please try again later</h1>
          <Button onClick={() => window.location.reload()} variant="contained">
            Reload
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
