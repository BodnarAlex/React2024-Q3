import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import type { Props, State } from './types.ts';
import { ErrorPage } from '../../pages/error-page/ErrorPage.tsx';

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || error.toString(),
    };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    const errorContent = `Error boundary: ${error.message} ${info.componentStack || ''}`;
    console.error(errorContent);
  }

  public handleReset = (): void => {
    this.setState({ hasError: false });
  };

  public render(): ReactNode {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorPage errorMessage={errorMessage} onReset={this.handleReset} />;
    }

    return children;
  }
}
