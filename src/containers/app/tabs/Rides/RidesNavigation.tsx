import React, { useState } from 'react';
import styled from 'styled-components/native';
import MyRides from './MyRides';
import RideRequests from './RideRequests';
import Rides from './Rides';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabBar from './TabBar';

export enum RideTabs {
  Rides = 'rides',
  MyRides = 'my-rides',
  RideRequests = 'ride-requests',
}

const RenderedTabs = SceneMap({
  [RideTabs.Rides]: Rides,
  [RideTabs.MyRides]: MyRides,
  [RideTabs.RideRequests]: RideRequests,
})

const RidesNavigation: React.FC = () => {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const routes = [
    { key: RideTabs.Rides, title: 'Viajes', index: 0 },
    { key: RideTabs.MyRides, title: 'Mis viajes', index: 1 },
    { key: RideTabs.RideRequests, title: 'Solicitudes', index: 2 },
  ];

  return (
    <Container>
      <TabView
        navigationState={{ index: selectedTabIndex, routes }}
        renderScene={RenderedTabs}
        onIndexChange={setSelectedTabIndex}
        renderTabBar={TabBar}
      />

    </Container>
  )
}
export default RidesNavigation;

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
`;
