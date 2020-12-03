
export interface BaseButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}
