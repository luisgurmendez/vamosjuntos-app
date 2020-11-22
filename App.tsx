import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MapProvider } from 'components/Map/MapProvider';
import useInitStorage from 'hooks/useInitStorage';
import moment from 'moment';
import localization from 'moment/locale/es';
import RootNavigation from 'containers/RootNavigation';
import Toaster from 'components/Toaster/Toaster';
import { enableScreens } from 'react-native-screens';
import PortalHost from 'components/Portal/PortalHost';
import { RootStackScreen } from 'containers/test/Test';

enableScreens();
moment.updateLocale('es', localization);

const App = () => {

  useInitStorage();

  return (
    <NavigationContainer>
      <MapProvider>
        <Toaster />
        <RootNavigation />
      </MapProvider>
    </NavigationContainer>
  );
}

export default App;

