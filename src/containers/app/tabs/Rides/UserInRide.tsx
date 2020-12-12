import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';
import Shadow from 'components/Shadow/Shadow';
import React from 'react'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface UserInRideProps {
}

const UserInRide: React.FC<UserInRideProps> = ({ }) => {

  return (
    <Container>
      <ProfilePicPlaceholder size={50} />
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