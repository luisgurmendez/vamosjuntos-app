import React from 'react';
import Comment from './Comment';
import { Review } from 'types/models';
import styled from 'styled-components/native';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import MarginedChildren from 'components/Box/MarginedChildren';

const noReviewsImage = require('../../assets/NoReviews.png')

interface CommentListProps {
  reviews: Review[];
}

const CommentList: React.FC<CommentListProps> = ({ reviews }) => {

  return (
    <Container
      showContent={reviews.length !== 0}
      noContentAsset={noReviewsImage}
    >
      <MarginedChildren mt="lg">
        {reviews.map(review => <Comment review={review} />)}
      </MarginedChildren>

    </Container>
  )
}

export default CommentList;

const Container = styled(ScrollableContent)`
  padding: 8px;
`