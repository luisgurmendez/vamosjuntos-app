import React from 'react';
import Comment from './Comment';
import { Review } from 'types/models';
import WithBackgroundImage from 'components/WithBackgroundImage/WithBackgroundImage';
import styled from 'styled-components/native';
import { NO_REVIEWS_IMG } from 'assets/images';

interface CommentListProps {
  reviews: Review[];
}

const CommentList: React.FC<CommentListProps> = ({ reviews }) => {

  return (
    <WithBackgroundImage asset={reviews.length === 0 ? NO_REVIEWS_IMG : undefined}>
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