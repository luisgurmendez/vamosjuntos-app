import Badge from 'components/Badge/Badge';
import React from 'react';
import { View } from 'react-native';
import { TabBar as NativeTabBar, TabBarItemProps, NavigationState, SceneRendererProps } from 'react-native-tab-view';
import { Route, Scene } from 'react-native-tab-view/lib/typescript/types';
import { useSelector } from 'react-redux';
import { getPendingRideRequests, getPendingRides } from 'state/ride/selectors';
import { colors } from 'utils/colors';
import { RideTabs } from './RidesNavigation';

const TabBar: React.FC<SceneRendererProps & { navigationState: NavigationState<any> }> = (props) => {

  const rideRequests = useSelector(getPendingRideRequests);
  const pendingRides = useSelector(getPendingRides);

  const renderBadge = ({ route }: { route: Route }) => {
    if (
      route.key === RideTabs.MyRides &&
      props.navigationState.index !== (route as any).index
    ) {
      return <View style={{ marginTop: 6, marginRight: 6 }}><Badge badge={pendingRides.length} /></View>
    }

    if (
      route.key === RideTabs.RideRequests &&
      props.navigationState.index !== (route as any).index
    ) {
      return <View style={{ marginTop: 6, marginRight: 6 }}><Badge badge={rideRequests.length} /></View>
    }

    return null;
  }

  return (
    <NativeTabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.main }}
      style={{ backgroundColor: 'transparent' }}
      labelStyle={{
        textTransform: 'none',
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
      }}
      renderBadge={renderBadge}
      activeColor={colors.black}
      inactiveColor={colors.gray}
    />
  )
}


export default TabBar;
