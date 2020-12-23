import { Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import React from 'react';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { User } from 'types/models';
import PreferenceList from 'components/Profile/PreferenceList';
import RidesAndLifts from 'components/Profile/RidesAndLifts';
import UserSince from 'components/Profile/UserSince';
import PageWithBack from 'components/Page/PageWithBack';
import ProfileReviews from 'components/Profile/ProfileReviews';

interface UserProfileProps {
  route: { params: { user: User } }
}

const UserProfile: React.FC<UserProfileProps> = ({ route: { params: { user } } }) => {

  return (
    <PageWithBack>
      <Container>
        <Content contentContainerStyle={{ alignItems: 'center' }}>
          <ProfileImageContainer>
            <ProfilePic img={user.img} size={160} />
          </ProfileImageContainer>
          <Subtitle>{user.name}</Subtitle>
          <ProfileReviews userId={user.id} disabledReviews={false} score={user.score} />
          <RidesAndLifts rides={5} lifts={6} />
          <PreferenceList preferences={user.preferences} />
        </Content>
        <UserSince date={user.createdAt} />
      </Container>
    </PageWithBack>
  )
}

export default UserProfile;

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
`

const Content = styled.ScrollView`
  flex: 1;
  width:100%;
  flex-direction: column;
  padding-horizontal: 32px;
`

const ProfileImageContainer = styled.View`
  position: relative;
  margin-bottom: 16px;
`;
