import 'react-native-gesture-handler';
import React, { Children, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MapProvider } from 'components/Map/MapProvider';
import useInitStorage from 'hooks/useInitStorage';
import moment from 'moment';
import localization from 'moment/locale/es';
import RootNavigation from 'containers/RootNavigation';
import { enableScreens } from 'react-native-screens';
import store from 'state/store';
import { Provider, useDispatch } from 'react-redux';
import AppCrashHandler from 'containers/AppCrashHandler';
import useIsAppReady from 'hooks/useIsAppReady';
import { LogBox, View } from 'react-native';
import { Title } from 'components/Typography/Typography';
import useInternetConnection from 'hooks/useInternetConnection';
import { setHasInternetConnection } from 'state/general/actions';
import styled from 'styled-components/native';
import ErrorBanner from 'components/ErrorBanner/ErrorBanner';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [hasInternetConnection, hasCheckedInternetConnection] = useInternetConnection();
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasCheckedInternetConnection) {
      dispatch(setHasInternetConnection(hasInternetConnection));
    }

  }, [hasInternetConnection, hasCheckedInternetConnection])

  if (isReady && hasCheckedInternetConnection) {
    return (
      <Container>
        {!hasInternetConnection && <SafeAreaView><ErrorBanner>No hay conexion a internet</ErrorBanner></SafeAreaView>}
        {children}
      </Container>
    );
  }

  return (
    <View>
      <Title>Splashscreen!</Title>
    </View>
  )
}

const Container = styled.View`
  flex: 1;
`