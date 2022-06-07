import ProfilePic from 'components/ProfilePic/ProfilePic';
import Score from 'components/Score/Score';
import { Body } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';
import { User } from 'types/models';

interface UserCardPlainProps {
  user: User;
}

const UserCardPlain: React.FC<UserCardPlainProps> = ({ user, children }) => {

  return (
    <Container>
      <ProfilePic img={user.img} size={50} />
      <Content>
        <Score score={user.score} size={15} />
        <Body>{user.name}</Body>
      </Content>
      {children}
    </Container>
  )

}

export default UserCardPlain;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
`

const Content = styled.View`
  margin-left: 16px;
  justify-content: center;
  flex: 1;
`