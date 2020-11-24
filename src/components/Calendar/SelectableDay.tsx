import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'components/Typography/Typography';
import { colors } from 'utils/colors';
import { TouchableOpacity, View } from 'react-native';

interface SelectableDayProps {
  date: moment.Moment;
  onSelect?: (date: moment.Moment) => void;
  selected?: boolean;
  disabled?: boolean;
}

const SelectableDay: React.FC<SelectableDayProps> = ({ date, onSelect, selected, disabled }) => {
  const handleDaySelect = !disabled ? () => onSelect && onSelect(date) : undefined;

  return (
    <SelectableContainer>
      <TouchableOpacity onPress={handleDaySelect}>
        <ColorDecorator disabled={disabled} selected={selected}>
          <CenteredText>{date.date()}</CenteredText>
        </ColorDecorator>
      </TouchableOpacity>
    </SelectableContainer>
  );
};

export default SelectableDay;

interface ColorDecoratorProps {
  disabled?: boolean;
  selected?: boolean;
}

const defineColor = (props: ColorDecoratorProps): string => {
  if (props.disabled) {
    return colors.invalid;
  }

  if (props.selected) {
    return colors.white;
  }

  return colors.black;
};

const ColorDecorator = styled.Text<ColorDecoratorProps>`
  color: ${(props) => defineColor(props)};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CenteredText = styled.Text`
  text-align: center;
  flex: 1;
`;

const SelectableContainer = styled.View`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  height: 16px;
`;
