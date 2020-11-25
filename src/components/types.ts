import { StyleProp, ViewStyle } from 'react-native';

export interface Stylable<T = ViewStyle> {
  style?: StyleProp<T>;
}
