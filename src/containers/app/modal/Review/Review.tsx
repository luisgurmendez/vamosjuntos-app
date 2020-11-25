import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import Toaster from 'components/Toaster/Toaster';
import ReviewForm from './ReviewForm';
import ProfilePicPlaceholder from 'components/ProfilePic/ProfilePicPlaceholder';
import { useNavigation } from '@react-navigation/native';

const Review: React.FC = () => {

  const navigation: any = useNavigation();

  const handleSubmitReview = () => {
    setTimeout(() => {
      navigation.goBack(null);
    }, 2000)
  }

  return (
    <Container>
      <ProfilePicContainer>
        <ProfilePicPlaceholder size={150} />
      </ProfilePicContainer>
      <ReviewForm onSubmit={handleSubmitReview} />
    </Container>
  );
}

export default Review;

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`

const ProfilePicContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ProfilePic = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: ${colors.gray};
`
