import React from 'react'
import styled from 'styled-components/native';
import { Body } from 'components/Typography/Typography';
import ConfigurationOption from './ConfigurationOption';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';
import { useNavigation } from '@react-navigation/native';

interface ToOtherScreenOptionProps {
  title: string;
  toScreen?: string;
}

const ToOtherScreenOption: React.FC<ToOtherScreenOptionProps> = ({ title, toScreen }) => {
  const navigation = useNavigation<any>();

  const handleGoToOtherScreen = () => {
    if (toScreen !== undefined) {
      navigation.push(toScreen);
    }
  }

  return (
    <ConfigurationOption>
      <Container onPress={handleGoToOtherScreen}>
        <Body>{title}</Body>
        <Icon size={20} color={colors.black} name="chevron-right" />
      </Container>
    </ConfigurationOption>
  )
}

export default ToOtherScreenOption;

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`
