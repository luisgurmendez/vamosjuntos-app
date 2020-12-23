import React from 'react';
import styled from 'styled-components/native';
import ReviewForm, { ReviewFormValues } from './ReviewForm';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { useNavigation } from '@react-navigation/native';
import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import { User } from 'types/models';
import { createReview } from 'api/adedo';

interface ReviewProps {
  toUser: User;
}

const Review: React.FC<ReviewProps> = ({ toUser }) => {

  const navigation: any = useNavigation();

  const handleSubmitReview = async (values: ReviewFormValues) => {
    await createReview({ ...values, toUserId: toUser.id });
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