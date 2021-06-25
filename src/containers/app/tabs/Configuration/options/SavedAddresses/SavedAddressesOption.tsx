import { Body } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';
import ConfigurationOption from '../commons/ConfigurationOption';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';
import ToOtherScreenOption from '../commons/ToOtherScreenOption';
import ConfigurationScreens from '../../ConfigurationScreens';

interface SavedAddressesProps { }

const SavedAddresses: React.FC<SavedAddressesProps> = ({ }) => {

  return (
    <ToOtherScreenOption title="Direcciones guardadas" toScreen={ConfigurationScreens.SAVED_ADDRESSES} />
  )
}

export default SavedAddresses;

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`