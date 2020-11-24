import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import { Body, PlainInput, Text } from 'components/Typography/Typography';
import Wizard from 'components/Wizard/Wizard';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { LiftScreens } from '../LiftScreens';

function roundToPrecision(value: number, precision = 10) {
  return Math.round(value / precision) * precision;
}

const Price: React.FC = () => {
  const estimatedPrice = 300;
  const maxPrice = roundToPrecision(Math.round(estimatedPrice * 1.4), 10);

  const [price, setPrice] = useState(estimatedPrice);
  const priceTooHigh = price > estimatedPrice + 100;

  const handlePriceChange = (value: string) => {
    console.log(value);
    const newPrice = value !== '' ? parseInt(value) : 0;
    if (newPrice > maxPrice) {
      setPrice(maxPrice);
    } else {
      setPrice(newPrice);
    }
  };

  return (
    <Wizard nextScreen={LiftScreens.PRICE} title="¿Cuanto cobras?">
      <DismissKeyboard>
        <Container>
          <PriceInputContainer>
            <PriceInput onChangeText={handlePriceChange} value={`${price}`} keyboardType="numeric" maxLength={4} />
            <PriceSignText>$</PriceSignText>
          </PriceInputContainer>
          {priceTooHigh && (
            <GrayedBody>
              Nuestra comunidad se basa en la idea de compartir, no en ganar dinero. Ese es el motivo por el que se
              aplica un límite máximo a las aportaciones de los viajes.
            </GrayedBody>
          )}
        </Container>
      </DismissKeyboard>
    </Wizard>
  );
};

export default Price;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const PriceInput = styled(PlainInput)`
  font-size: 64px;
  text-align: center;
`;

const PriceInputContainer = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
`;

const PriceSignText = styled(Text)`
  font-size: 64px;
`;

const GrayedBody = styled(Body)`
  color: ${colors.gray};
  text-align: center;
`;
