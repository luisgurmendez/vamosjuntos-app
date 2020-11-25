import SomeOtherNotification from 'components/Notifications/SomeOtherNotification';
import { Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import React from 'react';
import EditProfilePicButton from './EditProfilePicButton';
import ScoreDisplay from 'components/Score/Score'
import { View } from 'react-native';
import CommentList from 'components/Comment/CommentList';
import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';

interface ProfileProps { }

const Profile: React.FC<ProfileProps> = () => {


  return (
    <Container>
      <Header>
        <ProfileImageContainer>
          <ProfilePicPlaceholder size={160} />
          <EditProfilePicButton />
        </ProfileImageContainer>
        <ProfileDetailsContainer>
          <View>
            <Subtitle>Luis Gurmendez</Subtitle>
            <ScoreDisplay score={4.3} size={20} />
          </View>
        </ProfileDetailsContainer>
      </Header>
      <Content>
        <Subtitle>Commentarios</Subtitle>
        <CommentList />
      </Content>
    </Container>
  );
};
export default Profile;

const Container = styled.SafeAreaView`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  padding: 8px;
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  display: flex;
  flex-direction:row;
  padding: 16px;
`

const ProfileDetailsContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
`

const ProfileImageContainer = styled.View`
  position: relative;
  margin-right: 24px;
`;

