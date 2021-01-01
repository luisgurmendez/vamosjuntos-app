import { useNavigation } from '@react-navigation/native';
import Shadow from 'components/Shadow/Shadow';
import { Screens } from 'containers/Screens';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { User } from 'types/models';
import { colors } from 'utils/colors';
import UserCardPlain from './UserCardPlain';

interface UserCardProps {
  user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {

  const navigation = useNavigation<any>();

  const handlePressUser = () => {
    navigation.push(Screens.USER_PROFILE, { user })
  }

  return (
    <TouchableOpacity onPress={handlePressUser}>
      <Container>
        <UserCardPlain user={user} />
      </Container>
    </TouchableOpacity>

  )
}

export default UserCard;

const Container = styled(Shadow)`
  width: 100%;
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 8px;
  margin-top: 10px;
  flex-direction: row;
`

