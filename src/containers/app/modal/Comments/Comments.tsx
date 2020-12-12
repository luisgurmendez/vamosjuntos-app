import CommentList from 'components/Comment/CommentList';
import PageWithBack from 'components/Page/PageWithBack';
import { Title } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';

interface CommentsProps {
}

const Comments: React.FC<CommentsProps> = ({ }) => {

  return (
    <PageWithBack>
      <Title>Comentarios</Title>
      <CommentList />
    </PageWithBack>
  )

}

export default Comments;

const Container = styled.View`

`