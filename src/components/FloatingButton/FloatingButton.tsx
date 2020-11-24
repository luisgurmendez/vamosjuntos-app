import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from 'components/Loading/Loading';

type ContentSize = 'sm' | 'md' | 'lg';

interface FloatingButtonProps {
  icon: string;
  loading?: boolean;
  onPress?: () => void;
  size?: ContentSize;
  iconColor?: string;
  style?: any;
  backgroundColor?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  style,
  icon,
  loading = false,
  onPress,
  size = 'md',
  backgroundColor = 'white',
  iconColor = '#4285F4'
}) => {
  const sizes = {
    sm: { container: 30, icon: 18 },
    md: { container: 40, icon: 22 },
    lg: { container: 50, icon: 25 }
  };
  const contentSize = sizes[size];

  return (
    <FloatingButtonContainer
      style={style}
      size={contentSize.container}
      backgroundColor={backgroundColor}
      onPress={onPress}>
      {loading ? <Loading color={iconColor} /> : <Icon size={contentSize.icon} name={icon} color={iconColor} />}
    </FloatingButtonContainer>
  );
};

export default FloatingButton;

interface FloatingButtonContainerProps {
  backgroundColor: string;
  size: number;
}

const FloatingButtonContainer = styled.TouchableOpacity<FloatingButtonContainerProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.backgroundColor};
  padding: 5px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  elevation: 5;
`;
