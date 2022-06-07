import PlainButton from 'components/Button/PlainButton';
import { colors } from 'utils/colors';
import UserCard from 'components/UserCard/UserCard';
import React from 'react';
import styled from 'styled-components/native';
import { Passenger } from 'types/models';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

interface PassengerCardProps {
  passenger: Passenger;
  onTrajectoryPress?: () => void;
  onActionPress?: () => void;
}

const PassengerCard: React.FC<PassengerCardProps> = ({ passenger, onActionPress, onTrajectoryPress }) => {

  const shouldShowTrajectoryButton = onTrajectoryPress !== undefined;
  const shouldShowActionButton = onActionPress !== undefined;

  return (
    <Container>
      {shouldShowActionButton && (
        <ActionContainer activeOpacity={0.3} onPress={onActionPress}>
          <Icon
            color={colors.danger}
            name="x"
            size={20}
          />
        </ActionContainer>
      )}
      <UserCard
        user={passenger.user}
        action={shouldShowTrajectoryButton ? () => <PlainButton onPress={onTrajectoryPress}>Ver trayecto</PlainButton> : undefined}
      />
    </Container>
  )
}

export default PassengerCard;


const Container = styled.View`
  position: relative;
`

const ActionContainer = styled(TouchableOpacity)`
  z-index: 1000;
  position: absolute;
  right: 0px;
  top: 0px;
  borderRadius: 20px;
  borderWidth:2px;
  borderColor: ${colors.danger};
  backgroundColor: ${colors.white};
`