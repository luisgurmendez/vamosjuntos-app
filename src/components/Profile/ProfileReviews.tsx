import React from 'react'
import styled from 'styled-components/native';
import ScoreDisplay from 'components/Score/Score'
import { Screens } from 'containers/Screens';
import { useNavigation } from '@react-navigation/native';
import { SmallBody } from 'components/Typography/Typography';

interface ProfileReviewsProps {
  disabledReviews: boolean;
  score: number;
  userId: string;
}

const ProfileReviews: React.FC<ProfileReviewsProps> = ({ userId, disabledReviews, score }) => {
  const navigation = useNavigation<any>();

  const handleGoToComments = () => {
    navigation.push(Screens.COMMENTS, { userId })
  }

  return (
    <Container disabled={disabledReviews} onPress={handleGoToComments}>
      <ScoreDisplay score={score} size={30} />
      <SmallBody>Ver comentarios</SmallBody>
    </Container>
  )

}

export default ProfileReviews;

const Container = styled.TouchableOpacity`
  padding: 16px;
  width: 100%;
  align-items: center;
`