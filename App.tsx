import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MapProvider } from 'components/Map/MapProvider';
import useInitStorage from 'hooks/useInitStorage';
import moment from 'moment';
import localization from 'moment/locale/es';
import AppStack from 'containers/AppStack';

moment.updateLocale('es', localization);

const App = () => {

  useInitStorage();

  return (
    <NavigationContainer>
      <MapProvider>
        <AppStack />
      </MapProvider>
    </NavigationContainer>
  );
}

export default App;

