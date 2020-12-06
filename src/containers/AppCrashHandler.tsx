import { Title } from 'components/Typography/Typography';
import React, { ErrorInfo } from 'react';

class AppCrashHandler extends React.Component<{}, { hasError: boolean }> {

  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });

    // TODO: log error
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // TODO: hacer una pagina
      return <Title>Upss</Title>;
    }
    return this.props.children;
  }
}

export default AppCrashHandler;