import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import { Body, PlainInput, Text } from 'components/Typography/Typography';
import Wizard from 'components/Wizard/Wizard';
import { useField, useFormikContext } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { roundToPrecision } from 'utils/math';
import { RideScreens } from '../RideScreens';

const Price: React.FC = () => {

  const estimatedPrice = 300;
  const maxPrice = roundToPrecision(Math.round(estimatedPrice * 1.4), 10);

  const [price, priceMeta, priceHelpers] = useField<number>('price');
  const priceTooHigh = price.value > estimatedPrice + 100;
  const isFieldValid = priceMeta.error === undefined;

  const handlePriceChange = (value: string) => {
    const newPrice = value !== '' ? parseInt(value) : 0;
    if (newPrice > maxPrice) {
      priceHelpers.setValue(maxPrice);
    } else {
      priceHelpers.setValue(newPrice);
    }
  };

  return (
    <Wizard action={{ disabled: !isFieldValid }} nextScreen={RideScreens.SUMMARY} title="¿Por cuanto?">
      <GrayedBody>
        Recuerda que nuestra comunidad se basa en la idea de compartir, no en ganar dinero.
      </GrayedBody>
      <DismissKeyboard>
        <Container>
          <PriceInputContainer>
            <PriceInput onChangeText={handlePriceChange} value={`${price.value}`} keyboardType="numeric" maxLength={4} />
            <PriceSignText>$</PriceSignText>
          </PriceInputContainer>
          {priceTooHigh && (
            <GrayedBody>
              Mmm, ¿no te parece mucho ese monto?
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
  align-items: center;
`;

const PriceSignText = styled(Text)`
  font-size: 64px;
`;

const GrayedBody = styled(Body)`
  color: ${colors.gray};
  text-align: center;
`;
