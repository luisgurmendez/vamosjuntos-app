import { useNavigation } from '@react-navigation/native';
import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';
import Score from 'components/Score/Score';
import Shadow from 'components/Shadow/Shadow';
import { Body } from 'components/Typography/Typography';
import { Screens } from 'containers/Screens';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { User } from 'types/models';
import { colors } from 'utils/colors';

interface UserInRideProps {
  user: User
}

const UserInRide: React.FC<UserInRideProps> = ({ user }) => {


  console.log(user);

  const navigation = useNavigation<any>();

  const handlePressUser = () => {
    navigation.push(Screens.USER_PROFILE, { user })
  }

  return (
    <TouchableOpacity onPress={handlePressUser}>
      <Container>
        <ProfilePicPlaceholder size={50} />
        <UserContent>
          <Score score={user.score} size={15} />
          <Body>{user.name}</Body>
        </UserContent>
      </Container>
    </TouchableOpacity>

  )

}

export default UserInRide;

const Container = styled(Shadow)`
  width: 100%;
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 8px;
  margin-top: 10px;
  flex-direction: row;
`

const UserContent = styled.View`
  margin-left: 16px;
  justify-content: center;
`