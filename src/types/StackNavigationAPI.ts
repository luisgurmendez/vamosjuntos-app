export interface StackNavigationAPI {
  pop: () => void;
  push: (screen: string) => void;
}