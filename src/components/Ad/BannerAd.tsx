import React, { useState } from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const AdView: React.FC = () => {

  const [showAd, setShowAd] = useState(true);

  const onFailToRecieveAd = (error: any) => {
    setShowAd(false);
  }

  if (!showAd) {
    return null;
  }

  const dummyFn = () => { }

  return (
    <BannerAd
      onAdClosed={dummyFn}
      onAdFailedToLoad={onFailToRecieveAd}
      onAdLoaded={dummyFn}
      onAdOpened={dummyFn}
      onAdLeftApplication={dummyFn}
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    // <AdMobBanner
    //   adSize="fullBanner"
    //   adUnitID="ca-app-pub-3940256099942544/2934735716"
    //   testDeviceID={[AdMobBanner.simulatorId]}
    //   didFailToReceiveAdWithError={onFailToRecieveAd}
    //   onAdLoaded={(ad) => { console.log('loaded!', ad.target) }}
    // />
  )
}

export default AdView;
