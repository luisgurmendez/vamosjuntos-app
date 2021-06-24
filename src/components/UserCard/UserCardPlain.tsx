import { useNavigation } from '@react-navigation/native';
import PlainButton from 'components/Button/PlainButton';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import Score from 'components/Score/Score';
import Shadow from 'components/Shadow/Shadow';
import { Body } from 'components/Typography/Typography';
import { Screens } from 'containers/Screens';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { User } from 'types/models';
import { colors } from 'utils/colors';

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