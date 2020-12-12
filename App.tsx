import 'react-native-gesture-handler';
import React, { Children } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MapProvider } from 'components/Map/MapProvider';
import useInitStorage from 'hooks/useInitStorage';
import moment from 'moment';
import localization from 'moment/locale/es';
import RootNavigation from 'containers/RootNavigation';
import { enableScreens } from 'react-native-screens';
import store from 'state/store';
import { Provider } from 'react-redux';
import AppCrashHandler from 'containers/AppCrashHandler';
import useIsAppReady from 'hooks/useIsAppReady';
import { LogBox, View } from 'react-native';
import { Title } from 'components/Typography/Typography';

enableScreens();
moment.updateLocale('es', localization);

LogBox.ignoreAllLogs();

const App = () => {
  useInitStorage();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppCrashHandler>
          <SetupApp>
            <MapProvider>
              <RootNavigation />
            </MapProvider>
          </SetupApp>
        </AppCrashHandler>
      </Provider>
    </NavigationContainer>
  );
};

export default App;


const SetupApp: React.FC = ({ children }) => {

  const isReady = useIsAppReady();

  if (isReady) {
    return <>{children}</>;
  }

  return <View>
    <Title>Splashscreen!</Title>
  </View>

}