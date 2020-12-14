import { Body, LargeBody, Subtitle } from 'components/Typography/Typography';
import Wizard from 'components/Wizard/Wizard';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import RideBubble from 'components/Ride/RideBubble';
import { Ride } from 'types/models';
import RideDetailsSummary from 'components/Ride/RideDetailsSummary';
import { LiftCreationValues } from './LiftForm/formSchema';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';
import WhereFromToWhereTo from 'components/Address/WhereFromToWhereTo';
import { getDateText, getTimeText } from 'utils/date';
import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';

const LiftSummary: React.FC = () => {

  const { isValid, handleSubmit, validateForm, isSubmitting, values, errors } = useFormikContext<LiftCreationValues>();
  console.log(values);
  console.log(errors);
  console.log(isValid);

  useEffect(() => {
    validateForm()
  }, [])


  return (
    <Wizard action={{ disabled: !isValid, onPress: handleSubmit, label: 'Crear Viaje', loading: isSubmitting }} title="¡Ultimo paso!">
      <Subtitle>Estas a punto de crear un viaje.</Subtitle>
      <Body>Verifica que la informacion sea correcta</Body>
      <Content >
        <SummaryValue icon="map-pin">
          <WhereFromToWhereTo whereFrom={values.whereFrom!} whereTo={values.whereTo!} />
        </SummaryValue>
        <WhereFromWhereToStaticMap style={{ height: 150 }} whereFrom={values.whereFrom!} whereTo={values.whereTo!} mapId={"caca"} />
        <SummaryValue icon="calendar">
          <Body>{getDateText(values.date)} {getTimeText(values.date)}</Body>
        </SummaryValue>
        <SummaryValue icon="users">
          <Body>Entran {values.capacity} personas</Body>
        </SummaryValue>
        <SummaryValue icon="dollar-sign">
          <Body>Pedis una colaboracion de {values.price}$ c/u</Body>
        </SummaryValue>
      </Content>
    </Wizard>
  )
};

export default LiftSummary;

const Content = styled.ScrollView`
  width: 100%;
  flex: 1;
`;


interface SummaryValueProps {
  icon: string;
}

const SummaryValue: React.FC<SummaryValueProps> = ({ children, icon }) => {

  return (
    <SummaryValueContainer>
      <Icon name={icon} size={30} color={colors.gray} />
      <ValueContainer>
        {children}
      </ValueContainer>
    </SummaryValueContainer>
  )
}


const SummaryValueContainer = styled.View`
  display: flex;
  width: 100%;
  margin-vertical: 16px;
  flex-direction: row;
  align-items: center;
`

const ValueContainer = styled.View`
  margin-left: 16px;
  flex: 1 1 auto;
`