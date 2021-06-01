import React from 'react';
import styled from 'styled-components/native';
import ReviewForm, { ReviewFormValues } from './ReviewForm';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { useNavigation } from '@react-navigation/native';
import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import { Passenger, User } from 'types/models';
import { createReview } from 'api/callables';
import Toaster from 'components/Toaster/Toaster';

interface ReviewProps {
  route: { params: { passenger: Passenger; } }
}

const Review: React.FC<ReviewProps> = ({ route: { params: { passenger } } }) => {

  const navigation: any = useNavigation();
  const toUser = passenger.ride.driver;

  const handleSubmitReview = (values: ReviewFormValues) => {
    createReview({ ...values, rideId: passenger.ride.id, passengerId: passenger.id, toUserId: passenger.ride.driver.id }); // Silent request
    Toaster.success('Gracias!')
    navigation.goBack(null);
  }

  return (
    <Container>
      <DismissKeyboard>
        <ProfilePicContainer>
          <ProfilePic img={toUser.img} size={150} />
        </ProfilePicContainer>
        <ReviewForm toUser={toUser} onSubmit={handleSubmitReview} />
      </DismissKeyboard>
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