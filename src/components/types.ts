import { StyleProp, ViewStyle } from 'react-native';

export interface Stylable<T = ViewStyle> {
  style?: StyleProp<T>;
}

export interface WithChildren {
  children?: React.ReactNode
}