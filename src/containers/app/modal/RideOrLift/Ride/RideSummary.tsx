import { Body, LargeBody, Subtitle } from 'components/Typography/Typography';
import Wizard from 'components/Wizard/Wizard';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { RideCreationValues } from './RideForm/formSchema';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';
import WhereFromToWhereTo from 'components/Address/WhereFromToWhereTo';
import { getDateText, getTimeText } from 'utils/date';
import WhereFromWhereToStaticMap from 'components/Map/WhereFromWhereToStaticMap';
import IconedValue from 'components/IconedValue/IconedValue';

const RideSummary: React.FC = () => {

  const { isValid, handleSubmit, validateForm, isSubmitting, values, errors } = useFormikContext<RideCreationValues>();

  useEffect(() => {
    validateForm()
  }, [])

  return (
    <Wizard action={{ disabled: !isValid, onPress: handleSubmit, label: 'Crear Viaje', loading: isSubmitting }} title="¡Ultimo paso!">
      <Subtitle>Estas a punto de crear un viaje.</Subtitle>
      <Body>Verifica que la informacion sea correcta</Body>
      <Content >
        <IconedValue icon="map-pin">
          <WhereFromToWhereTo whereFrom={values.whereFrom!} whereTo={values.whereTo!} />
        </IconedValue>
        <WhereFromWhereToStaticMap style={{ height: 150 }} whereFrom={values.whereFrom!} whereTo={values.whereTo!} mapId={"ride-summary-map"} />
        <IconedValue icon="calendar">
          <Body>{getDateText(values.date)} {getTimeText(values.date)}</Body>
        </IconedValue>
        <IconedValue icon="users">
          <Body>Entran {values.capacity} personas</Body>
        </IconedValue>
        <IconedValue icon="dollar-sign">
          <Body>Pedis una colaboracion de {values.price}$ c/u</Body>
        </IconedValue>
      </Content>
    </Wizard>
  )
};

export default RideSummary;

const Content = styled.ScrollView`
  width: 100%;
  flex: 1;
`;
