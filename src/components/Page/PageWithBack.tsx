import { WithChildren } from 'components/types';
import React from 'react';
import styled from 'styled-components/native';
import Header from './Header';

interface PageProps extends WithChildren {
  secondaryAction?: React.ReactNode;
  title?: string;
}

const PageWithBack: React.FC<PageProps> = ({ title, secondaryAction, children }) => {

  return (
    <Container>
      <Header secondaryAction={secondaryAction} showBack title={title} />
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
  padding: 0px 24px;
`;

const Content = styled.View`
  flex:1;
`