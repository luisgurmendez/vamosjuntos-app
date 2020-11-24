declare module 'react-native-admob' {
  export interface AdMobBannerProps {
    adSize: string;
    adUnitID: string;
    testDeviceID: string | string[];
    didFailToReceiveAdWithError?: (error: any) => void;
    onAdLoaded?: (ad: any) => void;
  }

  export interface AdMobBannerStatic {
    simulatorId: string;
  }

  export const AdMobBanner: React.FC<AdMobBannerProps> & AdMobBannerStatic;
}
