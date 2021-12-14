import { SmallBody, LargeBody } from 'components/Typography/Typography';
import React, { ErrorInfo } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import Button from 'components/Button/Button';

const errorIlustration = require('../assets/VamosJuntosError.png');

class AppCrashHandler extends React.Component<{}, { hasError: boolean }> {

  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    crashlytics().recordError(error, errorInfo.componentStack)
    console.log(error, errorInfo);
  }

  handleReloadApp = () => {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Image
            style={{
              width: '100%',
            }}
            resizeMode="contain"
            source={errorIlustration}
          />
          <LargeBody>¡Ups! Parece que algo salio mal.</LargeBody>
          <StyledSmallBody>Este error fue guardado y lo vamos a revisar. Si seguis teniendo problemas, porfavor contactate con nosotros.</StyledSmallBody>
          <Button onPress={this.handleReloadApp} icon={'rotate-cw'} type="secondary">Recargar</Button>
        </Container>
      );

    }
    return this.props.children;
  }
}

export default AppCrashHandler;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  align-items: center;
  padding: 32px;
  background-color: #f1f1f1;

`

const StyledSmallBody = styled(SmallBody)`
  margin-top: 8px;
  margin-bottom: 16px;
  text-align: center;
`;
