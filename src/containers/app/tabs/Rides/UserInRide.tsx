import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';
import Shadow from 'components/Shadow/Shadow';
import { Body } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';
import { User } from 'types/models';
import { colors } from 'utils/colors';

interface UserInRideProps {
  user: User
}

const UserInRide: React.FC<UserInRideProps> = ({ user }) => {

  console.log(user);
  return (
    <Container>
      <ProfilePicPlaceholder size={50} />
      <Body>{user.username}</Body>
    </Container>
  )

}

export default UserInRide;

const Container = styled(Shadow)`
  width: 100%;
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 8px;
  margin-top: 10px;
`