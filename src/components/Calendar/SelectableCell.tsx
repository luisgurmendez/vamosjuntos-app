import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { TouchableOpacity, View } from 'react-native';

interface SelectableCellProps {
  date: moment.Moment;
  onSelect?: (date: moment.Moment) => void;
  selected?: boolean;
  disabled?: boolean;
}

const SelectableCell: React.FC<SelectableCellProps> = ({ children, date, onSelect, selected = false, disabled = false }) => {

  const handleCellSelect = !disabled ? () => onSelect && onSelect(date) : undefined;

  return (
    <Container>
      <CellTouchable onPress={handleCellSelect}>
        <SelectedIndicator selected={selected}>
          <ColorDecorator selected={selected} disabled={disabled}>
            {children}
          </ColorDecorator>
        </SelectedIndicator >
      </CellTouchable>
    </Container>
  )
}

export default SelectableCell;

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
}

const ColorDecorator = styled.Text<ColorDecoratorProps>`
  color: ${props => defineColor(props)};
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Container = styled.View`
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  flex: 1;
  flex-direction: row;
  position: relative;
`
interface Selectable {
  selected: boolean;
}
const SelectedIndicator = styled.View<Selectable>`
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  ${props => props.selected ? `backgroundColor: ${colors.main}` : 'transparent'};
  flex-direction: row;
  width: 32px;
  height: 32px;
  border-radius: 16px;
`


const CellTouchable = styled.TouchableOpacity`
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  flex: 1;
  flex-direction: row;
  padding: 4px;
`

const Cell = styled.View`
flex: 1;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
textAlign: center;
padding: 10px;
borderRadius: 4px;
`