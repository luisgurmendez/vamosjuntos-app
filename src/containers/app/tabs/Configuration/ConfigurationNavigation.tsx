import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import styled from 'styled-components/native';
import Configuration from './Configuration';
import ConfigurationScreens from './ConfigurationScreens';
import Complaint from './options/Complaint/Complaint';
import FAQ from './options/FAQ/FAQ';
import SavedAddresses from './options/SavedAddresses/SavedAddresses';

const Stack = createNativeStackNavigator();

interface ConfigurationStackProps { }

const ConfigurationStack: React.FC<ConfigurationStackProps> = ({ }) => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Atrás',
        headerShown: false
      }}>
      <Stack.Screen name={ConfigurationScreens.OPTIONS} component={Configuration} />
      <Stack.Screen name={ConfigurationScreens.FAQ} component={FAQ} />
      <Stack.Screen name={ConfigurationScreens.SAVED_ADDRESSES} component={SavedAddresses} />
      <Stack.Screen name={ConfigurationScreens.COMPLAINT} component={Complaint} />
    </Stack.Navigator>
  )

}

export default ConfigurationStack;

const Container = styled.View`

`