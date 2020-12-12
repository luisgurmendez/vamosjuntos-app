import CommentList from 'components/Comment/CommentList';
import { Subtitle } from 'components/Typography/Typography';
import React from 'react'
import styled from 'styled-components/native';

interface CommentsProps { }

const Comments: React.FC<CommentsProps> = ({ }) => {

  return (
    <Container>
      <Content>
        <Subtitle>Commentarios</Subtitle>
        <CommentList />
      </Content>
    </Container>
  )
}

export default Comments;

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 8px;
  width: 100%;
  height: 100%;
`
const Content = styled.View`
  padding-horizontal: 16px;
`