export interface StackNavigationAPI extends CommonNavigationAPI {
  pop: () => void;
  push: (screen: string) => void;
  popToTop: () => void;
}

export interface CommonNavigationAPI {
  navigate: (screen: string) => void;
  goBack: () => void;
  canGoBack: () => boolean;
  dangerouslyGetParent: <T extends CommonNavigationAPI>() => T;
}
