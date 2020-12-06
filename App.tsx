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
import store from 'state/store';
import { Provider } from 'react-redux';
import Camera from 'components/Camera/Camera';
import AppCrashHandler from 'containers/AppCrashHandler';

enableScreens();
moment.updateLocale('es', localization);

const App = () => {
  useInitStorage();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppCrashHandler>
          <MapProvider>
            <RootNavigation />
          </MapProvider>
        </AppCrashHandler>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
