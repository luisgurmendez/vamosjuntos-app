import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MapProvider } from 'components/Map/MapProvider';
import useInitStorage from 'hooks/useInitStorage';
import moment from 'moment';
import localization from 'moment/locale/es';
import AppStack from 'containers/AppStack';
import DismissKeyboard from 'components/Keyboard/DismissKeyboardView';
import Toaster from 'components/Toaster/Toaster';

moment.updateLocale('es', localization);

const App = () => {

  useInitStorage();

  return (
    <NavigationContainer>
      <MapProvider>
        <Toaster />
        <AppStack />
      </MapProvider>
    </NavigationContainer>
  );
}

export default App;

