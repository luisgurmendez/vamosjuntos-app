import { useNavigation } from '@react-navigation/native';
import { Body } from 'components/Typography/Typography';
import { Screens } from 'containers/Screens';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { Icon, IconProviders } from 'utils/icons';

interface ConversationCardProps {
  rideId: string;
}

const ConversationCard: React.FC<ConversationCardProps> = ({ rideId }) => {

  const navigation = useNavigation<any>();

  const handleNavigateToConversation = () => {
    navigation.push(Screens.RIDE_CONVERSATION, { rideId });
  }


  return (
    <TouchableOpacity onPress={handleNavigateToConversation}>
      <Container>
        <Icon provider={IconProviders.Feather} name="message-circle" size={30} color={colors.black} />
        <Body style={{ marginLeft: 4 }}>Chatea con los integrantes del viaje</Body>
      </Container>
    </TouchableOpacity>
  )
}

export default ConversationCard;

const Container = styled.View`
  width: 100%;
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 8px;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`
