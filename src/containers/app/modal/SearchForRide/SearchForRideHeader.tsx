import { useNavigation } from '@react-navigation/native';
import BackArrow from 'components/Back/BackArrow';
import PressableIcon from 'components/PressableIcon/PressableIcon';
import { LargeBody } from 'components/Typography/Typography';
import React from 'react';
import { Animated, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { IconProviders } from 'utils/icons';
import { SearchForRideScreens } from './Screens';
import SearchForRideHeaderForm from './SearchForRideHeaderForm';

interface Props {
  bellRingingAnimation: Animated.Value;
}

const SearchForRideHeader: React.FC<Props> = ({ bellRingingAnimation }) => {

  return (
    <Container>
      <SafeAreaView>
        <_Header bellRingingAnimation={bellRingingAnimation} />
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

const _Header: React.FC<Props> = ({ bellRingingAnimation }) => {

  const navigation = useNavigation<any>();

  const handleSavedSearchRidePress = () => {
    navigation.push(SearchForRideScreens.SAVED_SEARCH_RIDE);
  }

  const rotation = bellRingingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-20deg', '20deg']
  })

  return (
    <HeaderContainer>
      <BackArrow color={colors.white} />
      <ExpandedTitle>Busca un viaje</ExpandedTitle>
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <PressableIcon

          iconProvider={IconProviders.Material}
          size={32}
          color={colors.white}
          name='bell-ring-outline'
          onPress={handleSavedSearchRidePress}
        />
      </Animated.View>
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