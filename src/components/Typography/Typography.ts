import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface ExtraTextProps {
  bold?: boolean;
}

export const Text = styled.Text<ExtraTextProps>`
  font-family: Roboto;
  color: ${colors.black};
  ${props => props.bold ? 'font-weight: bold' : ''};
`;

export const AnimatedText = Animated.createAnimatedComponent(Text);

export const LargeTitle = styled(Text)`
font-weight: bold;
font-size: 46px;
`;

export const Title = styled(Text)`
  font-weight: bold;
  font-size: 32px;
`;

export const Subtitle = styled(Text)`
  font-weight: bold;
  font-size: 24px;
`;

export const LargeBody = styled(Text)`
  font-weight: 400;
  font-size: 20px;
`;

export const Body = styled(Text)`
  font-size: 16px;
`;

export const Bold = styled(Text)`
  font-weight: bold;
`

export const SmallBody = styled(Text)`
  font-size: 12px;
`;

export const PlainInput = styled.TextInput`
  font-family: Roboto;
  color: ${colors.black};
`;
