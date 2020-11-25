import MarginedChildren from 'components/Box/MarginedChildren';
import Travel from 'components/Travel/Travel';
import { Subtitle, Title } from 'components/Typography/Typography';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Page from '../commons/Page';

const Travels: React.FC = () => {
  return (
    <Page title="Viajes">
      <Container>
        <Subtitle>Pendientes</Subtitle>
        <MarginedChildren mt="md">
          <Travel id="1" />
          <Travel id="2" />
          <Travel id="3" />
          <Travel id="4" />
          <Travel id="5" />
        </MarginedChildren>
      </Container>
    </Page>
  );
}



export default Travels;

const Container = styled.ScrollView`
  flex: 1;
  padding: 8px;
`