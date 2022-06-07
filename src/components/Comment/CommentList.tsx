import React from 'react';
import Comment from './Comment';
import { Review } from 'types/models';
import styled from 'styled-components/native';
import { NO_REVIEWS_IMG } from 'assets/images';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import MarginedChildren from 'components/Box/MarginedChildren';

interface CommentListProps {
  reviews: Review[];
}

const CommentList: React.FC<CommentListProps> = ({ reviews }) => {

  return (
    <Container
      showContent={reviews.length !== 0}
      noContentAsset={NO_REVIEWS_IMG}
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