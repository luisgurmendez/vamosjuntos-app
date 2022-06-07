import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { renderAddressDetails } from 'components/Address/utils';
import { Body } from 'components/Typography/Typography';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styled from 'styled-components/native';
import { Address } from 'types/models';
import { colors } from 'utils/colors';
import { getDateTimeText } from 'utils/date';
import { SearchForRideScreens } from './Screens';
import { useSearchForRide } from './useSearchForRide';

const SearchForRideHeaderForm: React.FC = () => {
  return (
    <Container>
      <AddressInput type="origin"/>
      <AddressInput type="destination"/>
      <DateInput />
    </Container>
  );
};

export default SearchForRideHeaderForm;

const Container = styled.View``

interface AddressInputProps{
  type: 'origin' | 'destination';
}

const AddressInput: React.FC<AddressInputProps> = ({type}) => {

  const [address, setAddress] = useAddressInputState(type);
  const onSwapAddressValues = useHandleSwapAddressValues();

  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.push(SearchForRideScreens.WHERE_FROM_WHERE_TO, {onSelectAddress: setAddress});
  }

  const isOrigin = type === 'origin';
  const isAddressSetted = address !== null;
  
  const Dot = isOrigin? OriginDot : DestinationDot;
  const placeholder = isOrigin ? 'Origen' : 'Destino';

  const addressText = isAddressSetted? renderAddressDetails(address!) : null;
  const inputTextColor = isAddressSetted ? colors.black : colors.gray;

  return(
    <TouchableOpacity onPress={handlePress}>
      <AddressInputContainer>
        <Dot />
        <Body style={{color: inputTextColor, flex: 1}}>{isAddressSetted ? addressText : placeholder}</Body>
        { isOrigin && (
          <TouchableOpacity onPress={onSwapAddressValues}>
            <PositionedMaterialIcon size={20} color={colors.gray} name="swap-vertical" />
          </TouchableOpacity>
          )}
      </AddressInputContainer>
    </TouchableOpacity>
  )
}

function useAddressInputState(type: 'origin' | 'destination'): [Address | null, (a: Address) => void]{
  const {origin, destination, setOrigin, setDestination} = useSearchForRide();
  if(type === 'origin'){
    return [origin, setOrigin]
  }
  return [destination, setDestination]
}

function useHandleSwapAddressValues(){
  const {origin, destination, setOrigin, setDestination} = useSearchForRide();

  const onSwap = useCallback(() => {
    setOrigin(destination);
    setDestination(origin);
  }, [origin, destination, setOrigin, setDestination]);

  return onSwap;
}

const AddressInputContainer = styled.View`
  padding: 8px;
  background-color: white;
  width: 100%;
  margin-top: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BaseDot = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-right: 8px;
`

const DestinationDot = styled(BaseDot)`
  background-color: ${colors.main};
`

const OriginDot = styled(BaseDot)`
  border-width: 2px;
  border-color: ${colors.gray};
`

const PositionedMaterialIcon = styled(MaterialIcon)`
  margin-right: 8px;
`

const DateInput: React.FC = () => {
  const navigation = useNavigation<any>();
  const {date} = useSearchForRide();

  const handleNavigateToDate = () => {
    navigation.push(SearchForRideScreens.WHEN);
  }

  const dateText = getDateTimeText(date);

  return(
    <TouchableOpacity onPress={handleNavigateToDate}>
      <DateInputContainer>
        <Icon style={{marginRight: 8}} size={20} color={colors.white} name="clock" />
        <WhiteBody>{dateText}</WhiteBody>
        <Icon style={{marginLeft: 8}} size={20} color={colors.white} name="chevron-down" />
      </DateInputContainer>
    </TouchableOpacity>
  )
}

const DateInputContainer = styled.View`
  margin-top: 16px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const WhiteBody = styled(Body)`
  color: ${colors.white};
  font-weight: bold;
  flex-shrink: 1;
`