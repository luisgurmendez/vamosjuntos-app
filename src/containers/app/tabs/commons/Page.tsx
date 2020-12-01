import { Box } from 'components/Box/Box';
import { Title } from 'components/Typography/Typography';
import React, { useState } from 'react';
import styled from 'styled-components/native';

interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ title, children }) => {

  return (
    <Container>
      <Header p={"md"}>
        <Title>
          {title}
        </Title>
      </Header>
      <Content>
        {children}
      </Content>
    </Container>

  )
}

export default Page

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Header = styled(Box)`

`
const Content = styled.View`
  flex:1
`