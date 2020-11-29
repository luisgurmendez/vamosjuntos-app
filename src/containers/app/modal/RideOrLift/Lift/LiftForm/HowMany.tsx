import { useNavigation } from '@react-navigation/native';
import NumberSelect from 'components/NumberSelect/NumberSelect';
import Wizard from 'components/Wizard/Wizard';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StackNavigationAPI } from 'types/Navigation';
import { LiftScreens } from '../LiftScreens';

const HowMany: React.FC = () => {
  const [howMany, setHowMany] = useState(1);

  return (
    <Wizard nextScreen={LiftScreens.WHEN} title="¿A cuantos llevas?">
      <Container>
        <NumberSelect max={8} min={1} count={howMany} onChange={setHowMany} />
      </Container>
    </Wizard>
  );
};

export default HowMany;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
