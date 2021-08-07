import React from 'react';
import { Box } from 'components/Box/Box';
import { Title } from 'components/Typography/Typography';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface PageProps {
  title: string;
  renderAction?: () => React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, renderAction, children }) => {

  return (
    <Container>
      <Header p={"md"}>
        <Title>
          {title}
        </Title>
        {renderAction && renderAction()}
      </Header>
      <Content>
        {children}
      </Content>
    </Container >

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Content = styled.View`
  flex:1;
`