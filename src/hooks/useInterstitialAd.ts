import React, { useEffect, useRef, useState } from 'react';
import { InterstitialAd as NativeInterstitialAd, AdEventType, TestIds, FirebaseAdMobTypes } from '@react-native-firebase/admob';
import useFeatureFlag from './useFeatureFlag';
import { FeatureFlags } from 'types/models';
import { usePlatform } from './usePlatform';
import crashlytics from '@react-native-firebase/crashlytics';

const useInterstatialAd = () => {

  const [shown, setShown] = useState(false);
  const interstitial = useRef<FirebaseAdMobTypes.InterstitialAd | undefined>(undefined);
  const shouldShowAd = useFeatureFlag(FeatureFlags.FULL_SCREEN_ADS);
  const { isAndroid } = usePlatform();

  let adUnitId = TestIds.INTERSTITIAL;

  if (!__DEV__) {
    if (isAndroid) {
      adUnitId = 'ca-app-pub-8544233246340029/1289404476'
    } else {
      adUnitId = 'ca-app-pub-8544233246340029/4857599498'
    }
  }

  useEffect(() => {
    if (interstitial.current === undefined) {
      interstitial.current = NativeInterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true
      });

      interstitial.current.load();
    }

  }, [shouldShowAd])

  const handleShowAd = () => {
    if (interstitial.current && shouldShowAd) {
      if (interstitial.current.loaded && !shown) {
        interstitial.current.show();
        setShown(true);
      } else {
        // wait unitl ad loads.
        interstitial.current.onAdEvent((type, error) => {
          if (type === AdEventType.LOADED && !shown) {
            interstitial.current!.show();
            setShown(true);
          }

          if (error) {
            crashlytics().recordError(error);
          }
        })
      }
    }
  }

  return handleShowAd;
}

export default useInterstatialAd;