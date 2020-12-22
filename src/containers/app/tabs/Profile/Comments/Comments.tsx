import CommentList from 'components/Comment/CommentList';
import withReviews from 'components/Comment/withReviews';
import PageWithBack from 'components/Page/PageWithBack';
import { Subtitle } from 'components/Typography/Typography';
import React from 'react'
import { useSelector } from 'react-redux';
import { AppState } from 'state/types';
import styled from 'styled-components/native';

const ReviewList = withReviews(CommentList);

interface CommentsProps { }

const Comments: React.FC<CommentsProps> = ({ }) => {

  const user = useSelector((state: AppState) => state.user.user)

  return (
    <PageWithBack title="Comentarios">
      <ReviewList userId={user?.id!} />
    </PageWithBack>
  )
}

export default Comments;