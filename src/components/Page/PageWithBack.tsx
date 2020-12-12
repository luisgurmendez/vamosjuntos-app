import BackArrow from 'components/Back/BackArrow';
import { Box } from 'components/Box/Box';
import React from 'react';
import styled from 'styled-components/native';

interface PageProps {
}

const PageWithBack: React.FC<PageProps> = ({ children }) => {

  return (
    <Container >
      <Header p={"md"}>
        <BackArrow />
      </Header>
      <Content>
        {children}
      </Content>
    </Container>

  )
}

export default PageWithBack

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Header = styled(Box)``

const Content = styled.View`
  flex:1;
`