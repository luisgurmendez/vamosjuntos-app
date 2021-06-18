import { useNavigation } from '@react-navigation/native';
import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import { Body, PlainInput, Text } from 'components/Typography/Typography';
import Wizard from 'components/Wizard/Wizard';
import { useField, useFormikContext } from 'formik';
import useInterstatialAd from 'hooks/useInterstitialAd';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StackNavigationAPI } from 'types/Navigation';
import { colors } from 'utils/colors';
import { roundToPrecision } from 'utils/math';
import { RideScreens } from '../RideScreens';

const Price: React.FC = () => {

  const maxPrice = 3000

  const [price, priceMeta, priceHelpers] = useField<number>('price');
  const navigation: StackNavigationAPI = useNavigation<any>();
  const handleShowAd = useInterstatialAd();

  const priceTooHigh = price.value >= maxPrice;
  const isFieldValid = priceMeta.error === undefined && !priceTooHigh;

  const handlePriceChange = (value: string) => {
    const newPrice = value !== '' ? parseInt(value) : 0;
    priceHelpers.setValue(newPrice);
  };

  const handleNextScreen = () => {
    handleShowAd();
    navigation.push(RideScreens.SUMMARY);
  }

  return (
    <Wizard action={{ disabled: !isFieldValid, onPress: handleNextScreen }} title="¿Por cuanto?">
      <GrayedBody>
        Recuerda que nuestra comunidad se basa en la idea de compartir, no en ganar dinero.
      </GrayedBody>
      <DismissKeyboard>
        <Container>
          <PriceInputContainer>
            <PriceInput onChangeText={handlePriceChange} value={`${price.value}`} keyboardType="phone-pad" maxLength={5} />
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
