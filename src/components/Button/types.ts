import { TextStyle, ViewStyle } from "react-native";

export interface BaseButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
}
