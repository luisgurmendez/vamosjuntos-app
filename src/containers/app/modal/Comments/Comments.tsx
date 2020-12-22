import CommentList from 'components/Comment/CommentList';
import withReviews from 'components/Comment/withReviews';
import PageWithBack from 'components/Page/PageWithBack';
import React from 'react'

const ReviewList = withReviews(CommentList);

interface CommentsProps {
  userId: string;
}

const Comments: React.FC<CommentsProps> = ({ userId }) => {

  return (
    <PageWithBack title="Comentarios">
      <ReviewList userId={userId} />
    </PageWithBack>
  )
}

export default Comments;