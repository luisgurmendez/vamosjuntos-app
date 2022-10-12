import { LargeBody, Subtitle } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { User } from 'types/models';
import PreferenceList from 'components/Profile/PreferenceList';
import RidesAndLifts from 'components/Profile/RidesAndLifts';
import UserSince from 'components/Profile/UserSince';
import PageWithBack from 'components/Page/PageWithBack';
import ProfileReviews from 'components/Profile/ProfileReviews';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'utils/colors';
import { UserRideDetails } from 'api/responses';
import { getUserRideDetails } from 'api/callables';

interface UserProfileProps {
  route: { params: { user: User } }
}

const UserProfile: React.FC<UserProfileProps> = ({ route: { params: { user } } }) => {

  const [canGoToWpp, setCanGoToWpp] = useState(false);
  const [userRideDetails, setUserRideDetails] = useState<UserRideDetails | undefined>(undefined);
  const wppUrl = `whatsapp://send?phone=${user?.phone}&text=${'Hola'}`

  useEffect(() => {
    Linking.canOpenURL(wppUrl).then((can) => {
      if (can) {
        setCanGoToWpp(true)
      }
    }).catch(e => {
      console.log(e);
    })

    getUserRideDetails(user.id).then(details => {
      setUserRideDetails(details);
    })
  }, [wppUrl])

  const handleGoToWpp = () => {
    Linking.openURL(wppUrl);
  }

  return (
    <PageWithBack>
      <Container>
        <Content contentContainerStyle={{ alignItems: 'center' }}>
          <ProfileImageContainer>
            <ProfilePic img={user.img} size={160} />
          </ProfileImageContainer>
          <Subtitle>{user.name}</Subtitle>
          {canGoToWpp ?
            <WppButton onPress={handleGoToWpp}>
              <Icon style={{ marginRight: 8, }} color={colors.success} size={20} name="whatsapp" />
              <LargeBody>{user.phone}</LargeBody>
            </WppButton>
            :
            <LargeBody>{user.phone}</LargeBody>
          }
          <ProfileReviews userId={user.id} disabledReviews={false} score={user.score} />
          {userRideDetails && <RidesAndLifts rides={userRideDetails.numOfDriver} lifts={userRideDetails.numOfPassenger} />}
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

const WppButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`