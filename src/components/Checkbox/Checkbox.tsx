import React, { useCallback, useRef } from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { Body } from 'components/Typography/Typography';

import { Icon, IconProviders } from 'utils/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Stylable } from 'components/types';

interface CheckboxProps extends Stylable {
    value: boolean;
    onValueChange: (b: boolean) => void;
    label?: string | React.ReactNode;

}

const Checkbox: React.FC<CheckboxProps> = ({ style, label, value, onValueChange }) => {

    const handleValueChange = () => {
        onValueChange(!value);
    }

    return (
        <Container style={style}>
            <TouchableOpacity onPress={handleValueChange} style={{ marginRight: 6 }}>
                <CheckboxContainer selected={value}>
                    {value ? <Icon provider={IconProviders.Feather} name="check" color={colors.white} /> : null}
                </CheckboxContainer>
            </TouchableOpacity>
            {label && <BodyOrReactNode body={label} />}
        </Container>
    )
}

const CheckboxContainer = styled.View<{ selected: boolean }>`
    borderRadius: 2px;
    width:16px;
    height:16px;
    borderColor: ${colors.black};
    borderWidth: 1px;
    display: flex;
    flex-direction:row;
    alignItems: center;
    justifyContent: center;
    backgroundColor: ${props => props.selected ? colors.main : colors.white};
  `

const Container = styled.View`
  display: flex;
  flex-direction: row;
  
  width: 100%;
`

export default Checkbox;

interface Prop extends Stylable {
    body: string | React.ReactNode;
}

const BodyOrReactNode: React.FC<Prop> = ({ body, style }) => {
    if (typeof body === 'string') {
        return <Body style={style}>{body}</Body>
    }
    return (<>{body}</>)
}
