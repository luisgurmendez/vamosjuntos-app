import React from 'react'
import styled from 'styled-components/native';
import { Subtitle } from 'components/Typography/Typography';

interface NoNotificationsProps {
}

const NoNotifications: React.FC<NoNotificationsProps> = ({ }) => {

  return (
    <Container>
      <Subtitle>No tenes nuevas alertas</Subtitle>
    </Container>
  )

}

export default NoNotifications;

const Container = styled.View`

`