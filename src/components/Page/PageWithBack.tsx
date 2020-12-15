import BackArrow from 'components/Back/BackArrow';
import { Box } from 'components/Box/Box';
import React from 'react';
import styled from 'styled-components/native';

interface PageProps {
  secondaryAction?: React.ReactNode;
}

const PageWithBack: React.FC<PageProps> = ({ secondaryAction, children }) => {

  return (
    <Container >
      <Header pl={"md"}>
        <BackArrow />
        {secondaryAction}
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

const Header = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Content = styled.View`
  flex:1;
`