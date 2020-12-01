import NumberSelect from 'components/NumberSelect/NumberSelect';
import Wizard from 'components/Wizard/Wizard';
import { useField } from 'formik';
import React from 'react';
import styled from 'styled-components/native';
import { LiftScreens } from '../LiftScreens';

const HowMany: React.FC = () => {
  const [howMany, howManyMeta, howManyHelpers] = useField<number>('howMany');

  const isFieldValid = howManyMeta.error === undefined;

  return (
    <Wizard action={{ disabled: !isFieldValid }} nextScreen={LiftScreens.WHEN} title="¿A cuantos llevas?">
      <Container>
        <NumberSelect max={8} min={1} count={howMany.value} onChange={howManyHelpers.setValue} />
      </Container>
    </Wizard>
  );
};

export default HowMany;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
