import React from 'react';
import Comment from './Comment';
import { Review } from 'types/models';
import WithBackgroundImage from 'components/WithBackgroundImage/WithBackgroundImage';
import styled from 'styled-components/native';

const noReviewsImage = require('../../assets/NoReviews.png')

interface CommentListProps {
  reviews: Review[];
}

const CommentList: React.FC<CommentListProps> = ({ reviews }) => {

  return (
    <WithBackgroundImage asset={reviews.length === 0 ? noReviewsImage : undefined}>
      <Container
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={400}
      >
        {reviews.map(review => <Comment review={review} />)}
      </Container>
    </WithBackgroundImage>
  )
}

export default CommentList;

const Container = styled.ScrollView`
  flex: 1;
  height: 100%;
  padding: 8px;
`