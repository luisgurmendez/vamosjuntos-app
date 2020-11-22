export interface StackNavigationAPI {
  pop: () => void;
  push: (screen: string) => void;
  navigate: (screen: string) => void;
}