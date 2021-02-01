import CommentList from 'components/Comment/CommentList';
import withReviews from 'components/Comment/withReviews';
import PageWithBack from 'components/Page/PageWithBack';
import React from 'react'
import styled from 'styled-components/native';

const ReviewList = withReviews(CommentList);

interface CommentsProps {
  route: { params: { userId: string } }
}

const Comments: React.FC<CommentsProps> = ({ route: { params: { userId } } }) => {

  return (
    <PageWithBack title="Comentarios">
      <Content>
        <ReviewList userId={userId} />
      </Content>
    </PageWithBack>
  )
}

export default Comments;


const Content = styled.ScrollView`
  flex: 1;
  width:100%;
  flex-direction: column;
  padding-horizontal: 32px;
`
