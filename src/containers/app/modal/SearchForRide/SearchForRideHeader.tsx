import BackArrow from 'components/Back/BackArrow';
import { LargeBody } from 'components/Typography/Typography';
import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import SearchForRideHeaderForm from './SearchForRideHeaderForm';

const SearchForRideHeader: React.FC = () => {

  return(
    <Container>
      <SafeAreaView>
        <_Header />
        <SearchForRideHeaderForm />
      </SafeAreaView>
    </Container>
  )
}

export default SearchForRideHeader;

const Container = styled.View`
  background-color: ${colors.main};
  padding: 0px 16px 8px 16px;
`

const _Header: React.FC = () => {

  return (
    <HeaderContainer>
      <BackArrow color={colors.white}/>
      <ExpandedTitle>Busca un viaje</ExpandedTitle>
      <Placeholder />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View`
  display: flex;
  padding: 8px 0px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 100;
`;

const ExpandedTitle = styled(LargeBody)`
  flex: 1 1 auto;
  text-align: center;
  color: ${colors.white};
  font-weight: bold;
`

const Placeholder = styled.View`
  padding: 20px;
`;