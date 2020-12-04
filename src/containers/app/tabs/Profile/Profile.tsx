import SomeOtherNotification from 'components/Notifications/SomeOtherNotification';
import { LargeBody, Text, Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import React from 'react';
import EditProfilePicButton from './EditProfilePicButton';
import ScoreDisplay from 'components/Score/Score'
import { View } from 'react-native';
import CommentList from 'components/Comment/CommentList';
import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';
import { setShowCamera } from 'state/camera/actions';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'utils/colors';

interface ProfileProps { }

const Profile: React.FC<ProfileProps> = () => {

  const dispatch = useDispatch();

  const handleOpenCamera = () => {
    console.log('open cam!')
    dispatch(setShowCamera(true));
  }

  return (
    <Container>
      <Header>
        <ProfileImageContainer>
          <ProfilePicPlaceholder size={160} />
          <EditProfilePicButton onPress={handleOpenCamera} />
        </ProfileImageContainer>
        <ProfileDetailsContainer>
          <View>
            <Subtitle>Luis Gurmendez</Subtitle>
            <ScoreDisplay score={4.3} size={20} />
          </View>
          <RidesContainer>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon color={colors.black} name="thumb-up" size={25} />
              <LargeBody style={{ color: colors.black }}>: 4</LargeBody>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon color={colors.black} name="car" size={25} />
              <Text style={{ color: colors.black }}>: 1</Text>
            </View>
          </RidesContainer>
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
  justify-content: center;
  flex-grow: 1;
`

const ProfileImageContainer = styled.View`
  position: relative;
  margin-right: 24px;
`;

const RidesContainer = styled.View`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`