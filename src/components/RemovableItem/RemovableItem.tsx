import PressableIcon from 'components/PressableIcon/PressableIcon';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';

interface RemovableItemProps {
  onRemove?: () => void;
}

const RemovableItem: React.FC<RemovableItemProps> = ({ children, onRemove }) => {
  return (
    <Container>
      {children}
      {onRemove && <PressableIcon onPress={onRemove} name="x" size={20} color={colors.gray} />}
    </Container>
  );
};

export default RemovableItem;

const Container = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
