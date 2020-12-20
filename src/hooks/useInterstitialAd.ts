import React, { useEffect, useRef, useState } from 'react';
import { InterstitialAd as NativeInterstitialAd, AdEventType, TestIds, FirebaseAdMobTypes } from '@react-native-firebase/admob';
import useFeatureFlag from './useFeatureFlag';
import { FeatureFlags } from 'types/models';

//TODO add adUnitId
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const useInterstatialAd = () => {

  const [shown, setShown] = useState(false);
  const interstitial = useRef<FirebaseAdMobTypes.InterstitialAd | undefined>(undefined);
  const shouldShowAd = useFeatureFlag(FeatureFlags.FULL_SCREEN_ADS);

  useEffect(() => {
    if (interstitial.current === undefined) {
      interstitial.current = NativeInterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
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
        interstitial.current.onAdEvent(type => {
          if (type === AdEventType.LOADED && !shown) {
            interstitial.current!.show();
            setShown(true);
          }
        })
      }
    }
  }

  return handleShowAd;
}

export default useInterstatialAd;