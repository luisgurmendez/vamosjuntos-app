import { Box } from 'components/Box/Box';
import { WithChildren } from 'components/types';
import { Subtitle } from 'components/Typography/Typography';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface NotificationSectionProps extends WithChildren {
  section: string;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({ section, children }) => {

  return (
    <Container pV="md">
      <MarginedSubtitle>{section}</MarginedSubtitle>
      <Box pV="md">
        {children}
      </Box>
    </Container>
  )
}

export default NotificationSection;

const Container = styled(Box)`
  border-color: ${colors.border};
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  width: 100%;
`

const MarginedSubtitle = styled(Subtitle)`
  margin-left: 8px;
`