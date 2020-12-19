import React from 'react';
import Ad from './BannerAd';
import styled from 'styled-components/native';

export default function withAd<P>(
  WrappedComponent: React.ComponentType<P>,
): React.ComponentType<P> {
  const Component: React.FC<P> = (props: P) => {
    return (
      <Container>
        <WrappedComponentContainer>
          <WrappedComponent {...props} />
        </WrappedComponentContainer>
        <Ad />
      </Container>
    );
  };

  Component.displayName = `withAd(${WrappedComponent.displayName})`
  return Component;
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const WrappedComponentContainer = styled.View`
  flex-grow: 1;
`