import React, { useState } from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import crashlytics from '@react-native-firebase/crashlytics';
import { usePlatform } from 'hooks/usePlatform';

const AdView: React.FC = () => {

  const [showAd, setShowAd] = useState(true);
  const { isAndroid } = usePlatform();

  let adUnitId = TestIds.BANNER;

  if (!__DEV__) {
    if (isAndroid) {
      adUnitId = 'ca-app-pub-8544233246340029/6733302841'
    } else {
      adUnitId = 'ca-app-pub-8544233246340029/7297712968'
    }
  }

  const handleAddCrashToLoad = (error: any) => {
    setShowAd(false);
    crashlytics().recordError(error)
  }

  if (!showAd) {
    return null;
  }

  const dummyFn = () => { };


  return (
    <BannerAd
      onAdClosed={dummyFn}
      onAdFailedToLoad={handleAddCrashToLoad}
      onAdLoaded={dummyFn}
      onAdOpened={dummyFn}
      onAdLeftApplication={dummyFn}
      unitId={adUnitId}
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  )
}

export default AdView;
